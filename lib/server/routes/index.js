'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _documents = require('./documents.routes');

var _documents2 = _interopRequireDefault(_documents);

var _users = require('./users.routes');

var _users2 = _interopRequireDefault(_users);

var _search = require('./search.routes');

var _search2 = _interopRequireDefault(_search);

var _roles = require('./roles.routes');

var _roles2 = _interopRequireDefault(_roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(router) {
  (0, _users2.default)(router);
  (0, _documents2.default)(router);
  (0, _search2.default)(router);
  (0, _roles2.default)(router);
};

exports.default = routes;