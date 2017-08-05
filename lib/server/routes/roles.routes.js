'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dependencies = require('./dependencies');

var rolesRoute = function rolesRoute(router) {
  router.route('/roles').post(_dependencies.middlewares.validateRoleChange, _dependencies.RolesController.create).get(_dependencies.RolesController.findAll);
  router.route('/roles/:id').get(_dependencies.RolesController.findOne).put(_dependencies.middlewares.validateRoleChange, _dependencies.RolesController.update).delete(_dependencies.middlewares.validateRoleChange, _dependencies.RolesController.delete);
};

exports.default = rolesRoute;