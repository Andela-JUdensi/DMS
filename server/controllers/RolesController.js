import {
  Roles,
  Response,
  lodash
} from './dependencies';

/**
 * defines controller for /roles/ route
 *
 * @export
 * @class RolesController
 */
export default class RolesController {

  /**
   * create a new role
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof RolesController
   */
  static create(req, res) {
    const { roleId } = req.locals.user.decoded;
    if (roleId !== 1) {
      Response.unAuthorized(res, 'you are not authorized');
    }
    const roleData =
      lodash.pick(req.body, ['roleName', 'description']);

    Roles.create(roleData)
      .then(role => Response.created(res, role))
      .catch(error => Response.badRequest(res, error));
  }

  /**
   * fetch all roles
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof RolesController
   */
  static findAll(req, res) {
    const {
      limit = 10,
      offset = 0,
      orderBy = 'roleName'
    } = req.query;

    Roles.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'roleName', 'createdAt', 'updatedAt'],
      order: [[orderBy, 'ASC']],
    })
      .then(role => Response.success(res, role))
      .catch(error => Response
        .badRequest(res, error.message));
  }

  /**
   * fetch one role
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof RolesController
   */
  static findOne(req, res) {
    const { id } = req.params;
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
  }

  /**
   * update role information
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof RolesController
   */
  static update(req, res) {
    const { roleId } = req.locals.user.decoded;
    if (roleId !== 1) {
      Response.unAuthorized(res, 'you are not authorized');
    }
    const { id } = req.params;
    Roles.findOne({
      where: {
        id,
      }
    })
      .then((roleToUpdate) => {
        if (!(roleToUpdate)) return Response.notFound(res, 'role not found');
        const fieldsToUpdate =
          lodash.pick(req.body, ['roleName', 'description']);

        roleToUpdate.updateAttributes(fieldsToUpdate)
          .then(updatedRole => Response.success(res, updatedRole))
          .catch(error => Response.internalError(res, error.message));
      })
        .catch(error => Response.badRequest(res, error.message));
  }

  /**
   *
   * delete a role
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof RolesController
   */
  static delete(req, res) {
    const { roleId } = req.locals.user.decoded;
    if (roleId !== 1) {
      Response.unAuthorized(res, 'you are not authorized');
    }
    const { id } = req.params;
    Roles.destroy({
      where: {
        id,
      }
    })
      .then(() => Response.success(res, { status: true }))
      .catch(error => Response.badRequest(res, error.message));
  }
}
