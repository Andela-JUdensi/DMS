'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDeleteUser = exports.validateUserUpdate = exports.validateUserInput = undefined;

var _dependencies = require('./dependencies');

var Users = _dependencies.models.Users;

var validateUserInput = function validateUserInput(req, res, next) {
  if (parseInt(req.body.roleId, 10) === 1) {
    return _dependencies.Response.badRequest(res, 'you cannot signup with this priviledge');
  }

  if (_dependencies.Validator.validateSignup(req.body) !== undefined) {
    return _dependencies.Response.badRequest(res, _dependencies.Validator.validateSignup(req.body));
  }

  if (req.body.password && req.body.password.length < 7) {
    return _dependencies.Response.badRequest(res, 'password must be greater than 7 characters');
  }

  Users.findOne({ where: { email: req.body.email } }).then(function (user) {
    if (user) {
      return _dependencies.Response.badRequest(res, 'email already exist');
    }
    Users.findOne({ where: { username: req.body.username } }).then(function (newUser) {
      if (newUser) {
        return _dependencies.Response.badRequest(res, 'username already exist');
      }
      req.locals.userInput = req.body;
      next();
    });
  });
};

var validateUserUpdate = function validateUserUpdate(req, res, next) {
  if ([1, 2, 3].indexOf(parseInt(req.params.id, 10)) > 0) {
    return _dependencies.Response.badRequest(res, 'you cannot modify this user');
  }

  if (_dependencies.Validator.validateUserUpdate(req.body) !== true) {
    return _dependencies.Response.badRequest(res, _dependencies.Validator.validateUserUpdate(undefined.state));
  }

  if (parseInt(req.locals.user.decoded.roleId, 10) !== 1) {
    req.body = (0, _dependencies.omit)(req.body, 'roleId');
  }

  if (parseInt(req.locals.user.decoded.userId, 10) === parseInt(req.params.id, 10) || parseInt(req.locals.user.decoded.roleId, 10) === 1) {
    Users.findById(req.params.id).then(function (userToUpdate) {
      if (!userToUpdate) {
        return _dependencies.Response.badRequest(res, 'user not found');
      }
      req.locals.userToUpdate = userToUpdate;
      return next();
    });
  } else {
    return _dependencies.Response.unAuthorized(res, 'you are not permitted');
  }
};

var validateDeleteUser = function validateDeleteUser(req, res, next) {
  if (req.locals.user.decoded.roleId !== 1 && req.locals.user.decoded.userId !== parseInt(req.params.id, 10)) {
    return _dependencies.Response.forbidden(res, 'you cannot perform this action');
  }
  Users.findById(req.params.id).then(function (user) {
    if (!user) {
      return _dependencies.Response.notFound(res, 'user not found');
    }
    if (parseInt(user.roleId, 10) === 1 || [1, 2, 3].includes(user.id)) {
      return _dependencies.Response.forbidden(res, 'you can not perform this action');
    }
    req.locals.userToBeDeleted = user;
    next();
  });
};

exports.validateUserInput = validateUserInput;
exports.validateUserUpdate = validateUserUpdate;
exports.validateDeleteUser = validateDeleteUser;