import models from '../models';

const Blacklists = models.Blacklists;

export default class Helpers {

  /**
   *
   *
   * @static
   * @param {any} userId
   * @param {any} userroleId
   * @returns
   *
   * @memberOf Helpers
   */
  static determineDocsforUser(userId, userroleId, searchAccess) {
    if (!(userId)) {
      return [{ access: 'public' }];
    } else if (userroleId <= 2 && searchAccess !== 'all') {
      return [{ access: searchAccess }];
    } else if (userroleId <= 2 && searchAccess === 'all') {
      return [{ access: 'private' }, { access: 'public' }, { access: 'role' }, { ownerID: userId }];
    }
    return [{ access: 'public' }, { access: 'role' }, { ownerID: userId }];
  }

  /**
   *
   *
   * @static
   * @param {any} userId
   * @param {any} roleId
   * @returns
   *
   * @memberof Helpers
   */
  static getUserFromHeaders(userId, roleId) {
    if (!(userId) || !(roleId)) {
      return {
        userId: 0,
        roleId: 0
      };
    }
    const uID = userId.split(' ')[1];
    const rID = roleId.split(' ')[1];
    return {
      userId: uID,
      roleId: rID
    };
  }


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
    // .catch();
  }

  static paginate(containerObject, offset, limit) {
    return {
      totalCount: containerObject.count,
      pages: Math.ceil(containerObject.count / limit),
      currentPage: Math.floor(offset / limit) + 1,
      pageSize: containerObject.rows.length,
    } || null;
  }
}

