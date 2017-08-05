'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

Object.defineProperty(exports, 'usersTestSeed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_users).default;
  }
});

var _documents = require('./documents');

Object.defineProperty(exports, 'documentsTestSeed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_documents).default;
  }
});

var _roles = require('./roles');

Object.defineProperty(exports, 'rolesTestSeed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_roles).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }