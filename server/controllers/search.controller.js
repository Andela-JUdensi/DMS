import {
  Documents,
  Users,
  Response,
  Helpers
} from './dependencies';

/**
 * defines controllers for /search/ route
 *
 * @export
 * @class searchController
 */
export default class SearchController {

  /**
   * search for a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof SearchController
   */
  static searchForAUser(req, res) {
    const query = req.query.q.split(' ')
      .map(element => `%${element}%`);
    const { limit = 5, offset = 0 } = req.query;

    Users.findAndCountAll({
      limit,
      offset,
      where: {
        username: {
          $ilike: { $object: query }
        }
      },
      attributes: ['id', 'username', 'email', 'roleId'],
    })
      .then((searchResult) => {
        if (searchResult.length < 1) {
          return Response
            .notFound(res, `no match found for ${req.query.username}`);
        }

        const pagination = Helpers
          .paginate(searchResult, offset, limit);
        const result = { ...searchResult, ...pagination };

        return Response.success(res, result);
      })
      .catch(error => Response.badRequest(res, error.message));
  }

  /**
   * search for a document
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof SearchController
   */
  static searchForAdocument(req, res) {
    const { userId, roleId } = req.locals.user.decoded;
    const searchTokens = req.query.q.split(' ')
      .map(element => `%${element}%`);
    const { limit = 5, offset = 0 } = req.query;
    const query = Helpers
      .determineSearchQuery(searchTokens, userId, roleId);

    Documents.findAndCountAll({
      limit,
      offset,
      include: {
        model: Users,
        where: {
          roleId: { $gte: roleId },
        }
      },
      where: query,
    })
      .then((searchResult) => {
        if (searchResult.length < 1) {
          return Response
            .notFound(res, `no match found for ${req.query.q}`);
        }

        const pagination = Helpers
          .paginate(searchResult, offset, limit);
        const result = { ...searchResult, ...pagination };

        return Response.success(res, result);
      })
      .catch(error => Response.badRequest(res, error.message));
  }
}

