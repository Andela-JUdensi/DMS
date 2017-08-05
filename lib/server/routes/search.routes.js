'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dependencies = require('./dependencies');

var searchRoute = function searchRoute(router) {
  router.route('/search/users/').get(_dependencies.SearchController.searchForAUser);
  router.route('/search/documents/').get(_dependencies.SearchController.searchForAdocument);
};

exports.default = searchRoute;