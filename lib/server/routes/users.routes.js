'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dependencies = require('./dependencies');

var userRoute = function userRoute(router) {
  router.route('/users').post(_dependencies.middlewares.validateUserInput, _dependencies.UsersController.create).get(_dependencies.UsersController.findAll);
  router.route('/users/:id').get(_dependencies.UsersController.findOne).put(_dependencies.middlewares.validateUserUpdate, _dependencies.UsersController.update).delete(_dependencies.middlewares.validateDeleteUser, _dependencies.UsersController.delete);

  router.route('/users/login').post(_dependencies.middlewares.validateLoginInput, _dependencies.UsersController.login);

  router.route('/users/logout').post(_dependencies.UsersController.logout);
  router.route('/users/:id/documents').get(_dependencies.UsersController.documentsByUser);
};

exports.default = userRoute;