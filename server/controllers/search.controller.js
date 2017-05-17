import { Documents, Users, Response, Helpers } from './dependencies';

export default {

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  searchForAUser(req, res) {
    const query = req.query.q.split(' ').map(element => `%${element}%`);
    const { limit = 5, offset = 0, orderBy = 'id' } = req.query;
    Users.findAndCountAll({
      limit,
      offset,
      where: {
        username: {
          $ilike: { $any: query }
        }
      }
    })
      .then((searchResult) => {
        if (searchResult.length < 1) {
          return Response.notFound(res, `no match found for ${req.query.username}`);
        }
        const pagination = limit && offset ? {
          totalCount: searchResult.count,
          pages: Math.ceil(searchResult.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: searchResult.rows.length,
        } : null;
        const result = Object.assign(searchResult, pagination);
        return Response.success(res, result);
      })
      .catch(error => Response.badRequest(res, error.message));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  searchForAdocument(req, res) {
    const { userID, roleID } = req.locals.user.decoded;
    const searchTokens = req.query.q.split(' ').map(element => `%${element}%`);
    const searchAccess = req.query.a;
    const query = Helpers.determineSearchQuery(searchAccess, searchTokens, userID, roleID);

    Documents.findAll({
      limit: 20,
      include: {
        model: Users,
        where: {
          roleID: { $gte: roleID },
        }
      },
      where: query,
    })
      .then((searchResult) => {
        if (!(searchResult) || (searchResult.length < 1)) {
          return Response.notFound(res, `no match found for ${req.query.q}`);
        }
        return Response.success(res, searchResult);
      })
      .catch(error => Response.badRequest(res, error.message));
  },
};

