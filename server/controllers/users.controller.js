import {
  Users,
  Documents,
  SERVER,
  jwt,
  Response,
  lodash,
  Helpers
} from './dependencies';

/**
 * defines controller for /users/ route
 *
 * @export
 * @class UsersController
 */
export default class UsersController {

  /**
   * Creates an instance of UsersController.
   *
   * @memberof UsersController
   */
  constructor() {
    this.secret = SERVER.JWT_SECRET;
  }

  /**
   *
   * creates a new user account
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static create(req, res) {
    const userData = lodash
      .pick(req.locals.userInput,
      ['firstname', 'lastname', 'username',
        'email', 'password', 'roleId']);

    Users.create(userData)
      .then(user => Response.created(res, {
        user: lodash.pick(user, ['username', 'email']),
        message: 'account created successfully'
      }))
      .catch(error => Response.badRequest(res, error.message));
  }

  /**
   * login a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} - response
   *
   * @memberof UsersController
   */
  static login(req, res) {
    const {
      identifier,
      password
    } = req.locals.userLogin;
    Users.findOne({
      where: {
        $or: {
          username: identifier,
          email: identifier
        },
      },
    })
      .then((user) => {
        if (!user) return Response.notFound(res, 'You don\'t exist');
        if (user && user.validatePassword(password)) {
          const userCtrl = new UsersController();

          const token = jwt.sign({
            userId: user.id,
            username: user.username,
            roleId: user.roleId
          }, userCtrl.secret, {
            expiresIn: 86400
          });

          return res.status(200).send({
            token,
            status: 'true',
          });
        }
        return Response.unAuthorized(res, 'wrong login credentials');
      });
  }

  /**
   *logout a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static logout(req, res) {
    const {
      userId
    } = req.locals.user.decoded;
    Users.findOne({
      where: {
        id: userId
      },
    })
      .then(() => {
        Response.success(res, { message: 'logout successful' });
      });
  }

  /**
   * fetch all users
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static findAll(req, res) {
    const {
      limit = 5, offset = 0, orderBy = 'id'
    } = req.query;
    Users.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'username', 'email', 'roleId'],
      order: [
          [orderBy, 'ASC']
      ],
    })
      .then((users) => {
        if (users) {
          const pagination = Helpers.paginate(users, offset, limit);
          const result = { ...users, ...pagination };
          return Response.success(res, result);
        }
        return Response.notFound(res, 'no user found');
      })
      .catch(error => Response
        .badRequest(res, error.message));
  }

  /**
   * fetch one user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static findOne(req, res) {
    const {
      id
    } = req.params;
    Users.findOne({
      where: {
        id,
      },
      attributes: ['id', 'username', 'email', 'firstname',
        'lastname', 'createdAt', 'updatedAt', 'roleId'],
    })
      .then((user) => {
        if (!(user)) return Response.notFound(res, 'user not found');
        Response.success(res, user);
      })
      .catch(error => Response
        .badRequest(res, error.message));
  }

  /**
   * upate user information
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static update(req, res) {
    const fieldsToUpdate = lodash
      .pick(req.body, ['firstname', 'lastname',
        'username', 'email', 'password', 'roleId'
      ]);
    req.locals.userToUpdate.update(fieldsToUpdate, {
      where: {
        id: req.locals.userToUpdate.id
      }
    })
      .then(updatedUser => Response.success(res, updatedUser))
      .catch(error => Response.badRequest(res, error.message));
  }

  /**
   * delete a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static delete(req, res) {
    req.locals.userToBeDeleted.destroy()
      .then(() => Response.success(res, { status: 'true' }))
      .catch(error => Response.badRequest(res, error.message));
  }

  /**
   *
   * fetch documents by a user
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {Object} - response
   *
   * @memberof UsersController
   */
  static documentsByUser(req, res) {
    const { limit = 12, offset = 0 } = req.query;
    const {
      id
    } = req.params;
    const {
      userId,
      roleId
    } = req.locals.user.decoded;
    const query = Helpers.determineDocsforUser(userId, roleId, 'all');

    Documents.findAndCountAll({
      where: {
        ownerID: id,
        $or: query,
      },
      include: {
        model: Users,
        attributes: ['id', 'username', 'roleId']
      }
    })
    .then((allDocuments) => {
      if (allDocuments.count < 1) return Response.notFound(res, 'no document found');

      const pagination = Helpers.paginate(allDocuments, offset, limit);
      const result = { ...allDocuments, ...pagination };

      Response.success(res, result);
    })
    .catch(error => Response.badRequest(res, error.message));
  }
}
