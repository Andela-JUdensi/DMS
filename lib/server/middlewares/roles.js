'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRoleChange = undefined;

var _dependencies = require('./dependencies');

var validateRoleChange = exports.validateRoleChange = function validateRoleChange(req, res, next) {
  if (req.locals.user.decoded.roleId !== 1) {
    return _dependencies.Response.unAuthorized(res, 'you are not authorized');
  }
  if ([1, 2, 3].includes(parseInt(req.params.id, 10))) {
    return _dependencies.Response.badRequest(res, 'can not modify this role');
  }
  return next();
};