import { Roles, Response, lodash } from './dependencies';

export default {

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  create(req, res) {
    const roleData = lodash.pick(req.body, ['roleName', 'description']);
    Roles.create(roleData)
      .then(role => Response.created(res, role))
      .catch(error => Response.badRequest(res, error));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  findAll(req, res) {
    const { limit = 10, offset = 0, orderBy = 'roleName' } = req.query;
    Roles.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'roleName', 'createdAt', 'updatedAt'],
      order: [[orderBy, 'ASC']],
    })
      .then(role => Response.success(res, role))
      .catch(error => Response
        .badRequest(res, error.message));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  findOne(req, res) {
    const { id } = req.body;
    Roles.findOne({
      where: {
        id,
      }
    })
    .then((role) => {
      if (!(role)) return Response.notFound(res, 'role not found');
      Response.success(res, role);
    })
    .catch(error => Response
      .badRequest(res, error.message));
  },

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   */
  update(req, res) {
    if (!(req.locals.user.isAuthenticated)) {
      return Response.unAuthorized(res, 'You are not logged in');
    }
    const { id } = req.body;
    Roles.findOne({
      where: {
        id,
      }
    })
      .then((roleToUpdate) => {
        if (!(roleToUpdate)) return Response.notFound(res, 'role not found');
        const fieldsToUpdate = lodash.pick(req.body, ['roleName', 'description']);
        roleToUpdate.updateAttributes(fieldsToUpdate)
          .then(updatedRole => Response.success(res, updatedRole))
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
    if (!(req.locals.user.isAuthenticated)) {
      return Response.unAuthorized(res, 'You are not logged in');
    }
    const { id } = req.body;
    Roles.destroy({
      where: {
        id,
      }
    })
      .then(roleToDelete => Response.success(res, roleToDelete))
      .catch(error => Response.badRequest(res, error.message));
  },
};
