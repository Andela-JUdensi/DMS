'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginInput = exports.verifyRouteAndMethod = exports.verifyAuthentication = undefined;

var _dependencies = require('./dependencies');

var verifyAuthentication = function verifyAuthentication(req, res, next) {
  req.locals = {};
  var authorizationToken = req.headers.authorization;
  var userId = 0,
      roleId = 0;
  _dependencies.Helpers.TokenIsBlacklisted(authorizationToken).then(function (tokenIsBlacklisted) {
    if (authorizationToken) {
      var token = authorizationToken.split(' ')[1];
      _dependencies.jwt.verify(token, _dependencies.SERVER.JWT_SECRET, function (error, decoded) {
        if (!error && tokenIsBlacklisted === false) {
          req.locals.user = { decoded: decoded, isAuthenticated: true };
          return next();
        }
        req.locals.user = {
          decoded: { userId: userId, roleId: roleId },
          isAuthenticated: false
        };
        return next();
      });
    } else {
      req.locals.user = {
        decoded: { userId: userId, roleId: roleId },
        isAuthenticated: false
      };
      return next();
    }
  });
};

var verifyRouteAndMethod = function verifyRouteAndMethod(req, res, next) {
  var forbiddenRequest = ['POST', 'PUT', 'DELETE', 'UPDATE'];
  var authRoutes = ['/api/users/login/', '/api/users/login', '/api/users/', '/api/users'];

  if (req.path.includes('logout')) {
    _dependencies.Helpers.BlacklistToken(req.headers.authorization.split(' ')[1]).then(function (status) {
      if (status === true) {
        req.locals.user = {};
        next();
      }
    });
  } else if (!authRoutes.includes(req.path) && forbiddenRequest.includes(req.method) && !req.locals.user.isAuthenticated || req.locals.user.decoded.userId === 0 && req.method === 'GET' && (req.path.includes('users') || req.path.includes('roles'))) {
    return res.status(401).json({ message: 'you are not signed in' });
  }
  req.locals.user = req.locals.user;
  return next();
};

var validateLoginInput = function validateLoginInput(req, res, next) {
  if (!req.body.identifier || !req.body.password) {
    return _dependencies.Response.badRequest(res, 'username and password are required');
  }
  req.locals.userLogin = req.body;
  next();
};

exports.verifyAuthentication = verifyAuthentication;
exports.verifyRouteAndMethod = verifyRouteAndMethod;
exports.validateLoginInput = validateLoginInput;