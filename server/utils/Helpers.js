import models from '../models';

const Blacklists = models.Blacklists;

export default class Helpers {

  /**
   *
   *
   * @static
   * @param {any} userID
   * @param {any} userRoleID
   * @returns
   *
   * @memberOf Helpers
   */
  static determineDocsforUser(userID, userRoleID, searchAccess) {
    if (!(userID)) {
      return [{ access: 'public' }];
    } else if (userRoleID <= 2 && searchAccess) {
      return [{ access: searchAccess }, { ownerID: userID }];
    } else if (userRoleID <= 2 && !searchAccess) {
      return [{ access: 'private' }, { access: 'public' }, { access: 'role' }, { ownerID: userID }];
    }
    return [{ access: 'public' }, { access: 'role' }, { ownerID: userID }];
  }

  /**
   *
   *
   * @static
   * @param {any} userID
   * @param {any} roleID
   * @returns
   *
   * @memberof Helpers
   */
  static getUserFromHeaders(userID, roleID) {
    if (!(userID) || !(roleID)) {
      return {
        userID: 0,
        roleID: 0
      };
    }
    const uID = userID.split(' ')[1];
    const rID = roleID.split(' ')[1];
    return {
      userID: uID,
      roleID: rID
    };
  }


  static determineSearchQuery(searchAccess, searchTokens, userID, roleID) {
    let query = '';
    if (searchAccess === 'undefined') {
      query = {
        title: {
          $iLike: { $any: searchTokens },
        },
        $or: this.determineDocsforUser(userID, roleID)
      };
      return query;
    }
    query = {
      title: {
        $ilike: { $any: searchTokens },
      },
      access: searchAccess,
      $or: this.determineDocsforUser(userID, roleID, searchAccess)
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
    // .then(() => )
    // .catch(() => )
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
}

