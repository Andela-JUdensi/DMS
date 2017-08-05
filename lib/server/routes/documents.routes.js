'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dependencies = require('./dependencies');

var documentRoute = function documentRoute(router) {
  router.route('/documents').post(_dependencies.middlewares.validateDocumentInput, _dependencies.DocumentsController.create).get(_dependencies.DocumentsController.findAll);
  router.route('/documents/:id').get(_dependencies.DocumentsController.findOne).put(_dependencies.middlewares.validateDocumentUpdate, _dependencies.DocumentsController.update).delete(_dependencies.middlewares.validateDeleteDocument, _dependencies.DocumentsController.delete);
};

exports.default = documentRoute;