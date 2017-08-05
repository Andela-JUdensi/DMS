'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var hostUrl = process.env.NODE_ENV === 'production' ? 'hermes-dms-develop.herokuapp.com' : 'localhost:9090';

var swaggerDefinition = {
  info: {
    title: 'Hermes Document Management System API',
    version: '1.0.0',
    description: 'API documentation for to create, manage and edit documents'
  },
  host: hostUrl,
  basePath: '/'
};

var options = {
  swaggerDefinition: swaggerDefinition,

  apis: ['./server/routes/documents.routes.js', './server/routes/users.routes.js', './server/routes/search.routes.js', './server/routes/roles.routes.js']
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

var swagger = function swagger(router) {
  router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Cntrol-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control', 'Pragma, Origin, Authorization, Content-Type, X-Requested-with');
    res.header('Access-Control-Allow-Headers', 'GET, PUT, POST, OPTIONS');
    res.send(swaggerSpec);
  });
};

exports.default = swagger;