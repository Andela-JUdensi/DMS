import {
  Response,
  models,
  Validator,
  omit,
} from './dependencies';

const Users = models.Users;

const validateUserInput = (req, res, next) => {
  if (parseInt(req.body.roleId, 10) === 1) {
    return Response.badRequest(res, 'you cannot signup with this priviledge');
  }

  if ((Validator.validateSignup(req.body) !== undefined)) {
    return Response.badRequest(res, Validator.validateSignup(req.body));
  }

  if (req.body.password && req.body.password.length < 7) {
    return Response.badRequest(res, 'password must be greater than 7 characters');
  }

  Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return Response.badRequest(res, 'email already exist');
      }
      Users.findOne({ where: { username: req.body.username } })
        .then((newUser) => {
          if (newUser) {
            return Response.badRequest(res, 'username already exist');
          }
          req.locals.userInput = req.body;
          next();
        });
    });
};

const validateUserUpdate = (req, res, next) => {
  if ([1, 2, 3].indexOf(parseInt(req.params.id, 10)) > 0) {
    return Response.badRequest(res, 'you cannot modify this user');
  }

  if (Validator.validateUserUpdate(req.body) !== true) {
    return Response.badRequest(res, Validator.validateUserUpdate(this.state));
  }

  if (parseInt(req.locals.user.decoded.roleId, 10) !== 1) {
    req.body = omit(req.body, 'roleId');
  }

  if (parseInt(req.locals.user.decoded.userId, 10)
      === parseInt(req.params.id, 10) ||
      (parseInt(req.locals.user.decoded.roleId, 10) === 1)) {
    Users.findById(req.params.id)
      .then((userToUpdate) => {
        if (!userToUpdate) {
          return Response.badRequest(res, 'user not found');
        }
        req.locals.userToUpdate = userToUpdate;
        return next();
      });
  } else {
    return Response.unAuthorized(res, 'you are not permitted');
  }
};

const validateDeleteUser = (req, res, next) => {
  if ((req.locals.user.decoded.roleId) !== 1
    && req.locals.user.decoded.userId !== parseInt(req.params.id, 10)) {
    return Response.forbidden(res, 'you cannot perform this action');
  }
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return Response.notFound(res, 'user not found');
      }
      if (parseInt(user.roleId, 10) === 1 || [1, 2, 3].includes(user.id)) {
        return Response.forbidden(res, 'you can not perform this action');
      }
      req.locals.userToBeDeleted = user;
      next();
    });
};

export {
  validateUserInput,
  validateUserUpdate,
  validateDeleteUser
};

