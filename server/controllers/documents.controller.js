import { Documents, Response, lodash, Users, Helpers } from './dependencies';

export default {

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  create(req, res) {
    // if (!req.locals.user.isAuthenticated) {
    //   return res.status(401).json('Signin to create document');
    // }
    Documents.create({
      title: req.body.title,
      body: req.body.body,
      access: req.body.access,
      ownerID: req.locals.user.decoded.userID,
    })
      .then(document => Response.created(res, document))
      .catch(error => Response.badRequest(res, error.message));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  findAll(req, res) {
    const { limit = 12, offset = 0, orderBy = 'createdAt' } = req.query;
    const { userID, roleID } = req.locals.user.decoded;
    const query = Helpers.determineDocsforUser(userID, roleID);
    Documents.findAndCountAll({
      limit,
      offset,
      order: [[orderBy, 'ASC']],
      include: {
        model: Users,
        where: {
          roleID: { $gte: roleID },
        }
      },
      where: {
        $or: query,
      }
    })
      .then(allDocuments => Response.success(res, allDocuments))
      .catch(error => Response.badRequest(res, error.message));
  },


  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   */
  findOne(req, res) {
    const { id } = req.params;
    if (!(parseInt(id, 10))) {
      return Response.badRequest(res, 'provide a valid document id');
    }
    const { userID, roleID } = req.locals.user.decoded;
    const query = Helpers.determineDocsforUser(userID, roleID);
    Documents.findOne({
      include: {
        model: Users,
        where: {
          roleID: { $gte: roleID },
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
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  update(req, res) {
    const { id } = req.params;
    if (!(req.locals.user.isAuthenticated)) {
      return Response.unAuthorized(res, 'You are not logged in');
    }
    Documents.findOne({
      where: {
        id,
      }
    })
      .then((documentToUpdate) => {
        if (!(documentToUpdate)) return Response.notFound(res, 'document not found');
        const fieldsToUpdate = lodash.pick(req.body, ['title', 'body']);
        documentToUpdate.updateAttributes(fieldsToUpdate)
          .then(updatedDocument => Response.success(res, { fieldsToUpdate, updatedDocument }))
          .catch(error => Response.internalError(res, error.message));
      })
      .catch(error => Response.badRequest(res, error.message));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  delete(req, res) {
    console.log('In document controller');
    const { id } = req.params;
    const { userID, roleID } = req.locals.user.decoded;
    const query = Helpers.determineDocsforUser(userID, roleID);
    Documents.destroy({
      include: {
        model: Users,
        where: {
          roleID: { $gte: roleID },
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
  },
};
