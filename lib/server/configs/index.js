'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('./database.config');

Object.defineProperty(exports, 'database', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_database).default;
  }
});

var _server = require('./server.config');

Object.defineProperty(exports, 'SERVER', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_server).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }