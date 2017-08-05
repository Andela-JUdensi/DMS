'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.set('views', _path2.default.join(__dirname, 'views'));
_server2.default.set('view engine', 'pug');

var isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping) {
  var webpackConfig = require('../webpack.config.dev');
  var compiler = (0, _webpack2.default)(webpackConfig);
  _server2.default.use((0, _webpackDevMiddleware2.default)(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  _server2.default.use((0, _webpackHotMiddleware2.default)(compiler));
} else {
  _server2.default.use(require('express').static('lib/client'));
}

_server2.default.all('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
});