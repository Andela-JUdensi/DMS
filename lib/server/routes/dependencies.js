'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewares = exports.SearchController = exports.RolesController = exports.DocumentsController = exports.UsersController = exports.SERVER = undefined;

var _configs = require('../configs');

var _controllers = require('../controllers');

var _middlewares = require('../middlewares');

var middlewares = _interopRequireWildcard(_middlewares);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.SERVER = _configs.SERVER;
exports.UsersController = _controllers.UsersController;
exports.DocumentsController = _controllers.DocumentsController;
exports.RolesController = _controllers.RolesController;
exports.SearchController = _controllers.SearchController;
exports.middlewares = middlewares;