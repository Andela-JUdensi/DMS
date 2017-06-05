import {
  Documents,
  Response,
  lodash,
  Users,
  Helpers
} from './dependencies';

/**
 * define controllers for /documents/ route
 *
 * @export
 * @class UsersController
 */
export default class DocumentsController {

  /**
   * creates new document
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static create(req, res) {
    const ownerID = req.locals.user.decoded.userId;
    const { title, body, access } = req.locals.documentInput;
    Documents.create({
      title,
      body,
      access,
      ownerID
    })
      .then(document => Response.created(res, document))
      .catch(error => Response.badRequest(res, error.message));
  }

 /**
  * fetch all documents
  *
  * @static
  * @param {object} req
  * @param {object} res
  * @returns {Object} - response
  *
  * @memberof DocumentsController
  */
  static findAll(req, res) {
    const {
      limit = 12,
      offset = 0,
      orderBy = 'createdAt',
      order = 'ASC',
      access = 'all'
    } = req.query;

    const { userId, roleId } = req.locals.user.decoded;
    const query = Helpers.determineDocsforUser(userId, roleId, access);
    Documents.findAndCountAll({
      limit,
      offset,
      order: [[orderBy, order]],
      include: {
        model: Users,
        attributes: ['id', 'username', 'roleId'],
        where: {
          roleId: { $gte: roleId },
        }
      },
      where: query
    })
      .then((allDocuments) => {
        if (allDocuments.length < 1) {
          return Response.notFound(res, 'no document found');
        }

        const pagination = Helpers.paginate(allDocuments, offset, limit);
        const result = Object.assign(allDocuments, pagination);

        Response.success(res, result);
      })
      .catch(error => Response.badRequest(res, error.message));
  }

  /**
   * fetch one document
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof DocumentsController
   */
  static findOne(req, res) {
    const { id } = req.params;
    if (!(parseInt(id, 10))) {
      return Response.badRequest(res, 'provide a valid document id');
    }
    const { userId, roleId } = req.locals.user.decoded;
    const query = Helpers.determineDocsforUser(userId, roleId, 'all');

    Documents.findOne({
      include: {
        model: Users,
        attributes: ['id', 'username', 'roleId'],
        where: {
          roleId: { $gte: roleId },
        }
      },
      where: {
        id,
        $or: query,
      }
    })
      .then((document) => {
        if (!(document)) return Response.notFound(res, 'document not found');
        return Response.success(res, document);
      })
      .catch(error => Response.badRequest(res, error.message));
  }

  /**
   * updates a document
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof DocumentsController
   */
  static update(req, res) {
    req.locals.documentToUpdate
      .update(lodash.pick(req.body, ['title', 'body']))
        .then(updatedDocument => Response.success(res, updatedDocument))
        .catch(error => Response.badRequest(res, error.message));
  }

  /**
   * deletes a document
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof DocumentsController
   */
  static delete(req, res) {
    req.locals.documentToBeDeleted.destroy({
      where: {
        id: req.locals.documentToBeDeleted.id,
      }
    })
      .then((document) => {
        if (!(document)) return Response.notFound(res, 'document not found');
        return Response.success(res, { status: 'deleted' });
      })
      .catch(error => Response.badRequest(res, error.message));
  }
}
