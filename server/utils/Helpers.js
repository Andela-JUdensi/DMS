import models from '../models';

const Blacklists = models.Blacklists;

/**
 * Helper class for controllers
 * middlewares
 *
 * @export
 * @class Helpers
 */
export default class Helpers {

  /**
   * determine document query for a user
   * based on userId and roleId
   *
   * @static
   * @param {integer} userId - user identity
   * @param {integer} userRoleId - user role identity
   * @param {string} access - document access
   * @returns {Object} - database query query
   *
   * @memberOf Helpers
   */
  static determineDocsforUser(userId, userRoleId, access) {
    if (!(userId)) {
      return { $or: [{ access: 'public' }] };
    } else if (userRoleId > 2 && access === 'private') {
      return { $and: [{ access }, { ownerID: userId }] };
    } else if (userRoleId > 2 && ['public', 'role'].includes(access)) {
      return { $or: [{ access }] };
    } else if (userRoleId <= 2 && access !== 'all') {
      return { $or: [{ access }] };
    } else if (userRoleId <= 2 && access === 'all') {
      return {
        $or: [
          { access: 'private' },
          { access: 'public' },
          { access: 'role' },
          { ownerID: userId }
        ]
      };
    }
    return { $or: [
      { access: 'public' },
      { access: 'role' },
      { ownerID: userId }
    ] };
  }

  /**
   * determine search query for a user
   * based on userId and roleId
   *
   * @static
   * @param {array} searchTokens - search query
   * @param {integer} userId - user identity
   * @param {integer} roleId - role identity
   * @returns {Object} - database query
   *
   * @memberof Helpers
   */
  static determineSearchQuery(searchTokens, userId, roleId) {
    let query = '';
    query = {
      title: {
        $ilike: { $any: searchTokens },
      },
      $or: this.determineDocsforUser(userId, roleId, 'all')
    };
    return query;
  }

  /**
   * adds token to database Blacklist table
   *
   * @static
   * @param {string} authorizationToken - jwt token
   * @returns {Promise} - result of database action
   *
   * @memberof Helpers
   */
  static BlacklistToken(authorizationToken) {
    return new Promise((resolve) => {
      Blacklists.create({
        authorizationToken
      })
      .then(() => {
        resolve(true);
      });
    });
  }

  /**
   * verifies if token is blacklisted
   *
   * @static
   * @param {string} authorizationToken - jwt token
   * @returns {Promise} - result of database action
   *
   * @memberof Helpers
   */
  static TokenIsBlacklisted(authorizationToken) {
    return new Promise((resolve) => {
      if (!authorizationToken) { resolve(false); }
      const token = authorizationToken.split(' ')[1];
      Blacklists.findOne({
        where: {
          authorizationToken: token,
        }
      })
      .then((foundToken) => {
        if (!foundToken) {
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }

  /**
   * creates pagination of database result
   *
   * @static
   * @param {object} containerObject - database result
   * @param {integer} offset - point to begin database fetch
   * @param {any} limit - maximum number of documents per call
   * @returns {Object} - pagination metadata
   *
   * @memberof Helpers
   */
  static paginate(containerObject, offset, limit) {
    return {
      metaData: {
        totalCount: containerObject.count,
        pages: Math.ceil(containerObject.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: containerObject.rows.length,
      }
    } || null;
  }
}

