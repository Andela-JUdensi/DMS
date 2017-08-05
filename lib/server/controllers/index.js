'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UsersController = require('./UsersController');

Object.defineProperty(exports, 'UsersController', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_UsersController).default;
  }
});

var _DocumentsController = require('./DocumentsController');

Object.defineProperty(exports, 'DocumentsController', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DocumentsController).default;
  }
});

var _SearchController = require('./SearchController');

Object.defineProperty(exports, 'SearchController', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SearchController).default;
  }
});

var _RolesController = require('./RolesController');

Object.defineProperty(exports, 'RolesController', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RolesController).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }