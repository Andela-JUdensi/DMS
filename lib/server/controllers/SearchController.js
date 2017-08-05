'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dependencies = require('./dependencies');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = function () {
  function SearchController() {
    _classCallCheck(this, SearchController);
  }

  _createClass(SearchController, null, [{
    key: 'searchForAUser',
    value: function searchForAUser(req, res) {
      var query = req.query.q.split(' ').map(function (element) {
        return '%' + element + '%';
      });
      var _req$query = req.query,
          _req$query$limit = _req$query.limit,
          limit = _req$query$limit === undefined ? 5 : _req$query$limit,
          _req$query$offset = _req$query.offset,
          offset = _req$query$offset === undefined ? 0 : _req$query$offset;


      _dependencies.Users.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {
          username: {
            $ilike: { $any: query }
          }
        },
        attributes: ['id', 'username', 'email', 'roleId']
      }).then(function (searchResult) {
        if (searchResult.length < 1) {
          return _dependencies.Response.notFound(res, 'no match found for ' + req.query.username);
        }

        var pagination = _dependencies.Helpers.paginate(searchResult, offset, limit);
        var result = _extends({}, searchResult, pagination);

        return _dependencies.Response.success(res, result);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'searchForAdocument',
    value: function searchForAdocument(req, res) {
      var _req$locals$user$deco = req.locals.user.decoded,
          userId = _req$locals$user$deco.userId,
          roleId = _req$locals$user$deco.roleId;

      var searchTokens = req.query.q.split(' ').map(function (element) {
        return '%' + element + '%';
      });
      var _req$query2 = req.query,
          _req$query2$limit = _req$query2.limit,
          limit = _req$query2$limit === undefined ? 5 : _req$query2$limit,
          _req$query2$offset = _req$query2.offset,
          offset = _req$query2$offset === undefined ? 0 : _req$query2$offset;

      var query = _dependencies.Helpers.determineSearchQuery(searchTokens, userId, roleId);

      _dependencies.Documents.findAndCountAll({
        limit: limit,
        offset: offset,
        include: {
          model: _dependencies.Users,
          where: {
            roleId: { $gte: roleId }
          }
        },
        where: query
      }).then(function (searchResult) {
        if (searchResult.length < 1) {
          return _dependencies.Response.notFound(res, 'no match found for ' + req.query.q);
        }

        var pagination = _dependencies.Helpers.paginate(searchResult, offset, limit);
        var result = _extends({}, searchResult, pagination);

        return _dependencies.Response.success(res, result);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }]);

  return SearchController;
}();

exports.default = SearchController;