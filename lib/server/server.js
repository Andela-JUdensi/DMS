'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _morganJson = require('morgan-json');

var _morganJson2 = _interopRequireDefault(_morganJson);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _swagger = require('./routes/swagger');

var _swagger2 = _interopRequireDefault(_swagger);

var _configs = require('./configs');

var _middlewares = require('./middlewares/');

var middlewares = _interopRequireWildcard(_middlewares);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();
var format = (0, _morganJson2.default)(':method :url :status :res[content-length] bytes :response-time ms');

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.json({ limit: '100mb' }));
app.use(_bodyParser2.default.urlencoded({ limit: '100mb', extended: true }));
app.use([middlewares.verifyAuthentication, middlewares.verifyRouteAndMethod]);
app.use((0, _morgan2.default)(format));

if (process.env.NODE_ENV !== 'production') {
  app.use('/documentation', _express2.default.static(_path2.default.join(__dirname, './swagger/')));
} else {
  app.use('/documentation', _express2.default.static(_path2.default.join(__dirname, '../../server/swagger/')));
}

(0, _routes2.default)(router);
(0, _swagger2.default)(router);

app.use('/api', router);

app.listen(_configs.SERVER.PORT, function () {
  return _winston2.default.info('Hermes is Awakened ON PORT ' + _configs.SERVER.PORT);
});

exports.default = app;