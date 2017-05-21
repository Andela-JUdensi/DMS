import { Users, Documents, SERVER, jwt, Response, lodash, Helpers } from './dependencies';

const secret = SERVER.JWT_SECRET;

export default {

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  create(req, res) {
    const userData = lodash.pick(req.locals.userInput, ['firstname', 'lastname', 'username', 'email', 'password', 'roleID']);
    Users.create(userData)
      .then(user => Response.created(res, {user, message: 'account created successfully' }))
      .catch(error => Response.badRequest(res, error.message));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  login(req, res) {
    const { identifier, password } = req.locals.userLogin;
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
          const token = jwt.sign({
            userID: user.id,
            username: user.username,
            roleID: user.roleID
          }, secret, {
            expiresIn: 86400
          });

          return res.status(200).send({
            token,
            expiresIn: 86400,
            message: `welcome ${user.username}`,
            user,
          });
        }
        return Response.unAuthorized(res, 'wrong login credentials');
      })
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  logout(req, res) {
    const { userID } = req.locals.user.decoded;
    Users.findOne({
      where: {
        id: userID
      },
    })
      .then(() => {
        req.locals.user = {};

        Response.success(res, 'logout successful');
      });
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  findAll(req, res) {
    const { limit = 5, offset = 0, orderBy = 'id' } = req.query;
    Users.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt', 'roleID'],
      order: [[orderBy, 'ASC']],
    })
      .then((users) => {
        if (users) {
          const pagination = limit && offset ? {
            totalCount: users.count,
            pages: Math.ceil(users.count / limit),
            currentPage: Math.floor(offset / limit) + 1,
            pageSize: users.rows.length,
          } : null;
          const result = Object.assign(users, pagination);
          return Response.success(res, result);
        }
        return Response.notFound(res, 'no user found');
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
  findOne(req, res) {
    const { id } = req.params;
    Users.findOne({
      where: {
        id,
      },
      attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt', 'roleID'],
    })
    .then((user) => {
      if (!(user)) return Response.notFound(res, 'user not found');
      Response.success(res, user);
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
    const fieldsToUpdate = lodash.pick(req.body, ['firstname', 'lastname', 'username', 'email', 'password', 'roleID']);
    req.locals.userToUpdate.update(fieldsToUpdate)
      .then(updatedUser => Response.success(res, updatedUser))
      .catch(error => Response.badRequest(res, error.message));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  delete(req, res) {
    req.locals.userToBeDeleted.destroy()
      .then(userToDelete => Response.success(res, userToDelete))
      .catch(error => Response.badRequest(res, error.message));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  documentsByUser(req, res) {
    const { id } = req.params;
    Documents.findAndCountAll({
      where: {
        ownerID: id,
      },
      include: {
        model: Users,
      }
    })
      .then((response) => {
        if (response.count < 1) return Response.notFound(res, 'no document found');
        Response.success(res, { response });
      })
      .catch(error => Response.badRequest(res, error.message));
  },
};
