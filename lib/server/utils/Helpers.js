'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blacklists = _models2.default.Blacklists;

var Helpers = function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }

  _createClass(Helpers, null, [{
    key: 'determineDocsforUser',
    value: function determineDocsforUser(userId, userRoleId, access) {
      if (!userId) {
        return { $or: [{ access: 'public' }] };
      } else if (userRoleId > 2 && access === 'private') {
        return { $and: [{ access: access }, { ownerID: userId }] };
      } else if (userRoleId > 2 && ['public', 'role'].includes(access)) {
        return { $or: [{ access: access }] };
      } else if (userRoleId <= 2 && access !== 'all') {
        return { $or: [{ access: access }] };
      } else if (userRoleId <= 2 && access === 'all') {
        return {
          $or: [{ access: 'private' }, { access: 'public' }, { access: 'role' }, { ownerID: userId }]
        };
      }
      return { $or: [{ access: 'public' }, { access: 'role' }, { ownerID: userId }] };
    }
  }, {
    key: 'determineSearchQuery',
    value: function determineSearchQuery(searchTokens, userId, roleId) {
      var query = '';
      query = {
        title: {
          $ilike: { $any: searchTokens }
        },
        $or: this.determineDocsforUser(userId, roleId, 'all')
      };
      return query;
    }
  }, {
    key: 'BlacklistToken',
    value: function BlacklistToken(authorizationToken) {
      return new Promise(function (resolve) {
        Blacklists.create({
          authorizationToken: authorizationToken
        }).then(function () {
          resolve(true);
        });
      });
    }
  }, {
    key: 'TokenIsBlacklisted',
    value: function TokenIsBlacklisted(authorizationToken) {
      return new Promise(function (resolve) {
        if (!authorizationToken) {
          resolve(false);
        }
        var token = authorizationToken.split(' ')[1];
        Blacklists.findOne({
          where: {
            authorizationToken: token
          }
        }).then(function (foundToken) {
          if (!foundToken) {
            return resolve(false);
          }
          return resolve(true);
        });
      });
    }
  }, {
    key: 'paginate',
    value: function paginate(containerObject, offset, limit) {
      return {
        metaData: {
          totalCount: containerObject.count,
          pages: Math.ceil(containerObject.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: containerObject.rows.length
        }
      } || null;
    }
  }]);

  return Helpers;
}();

exports.default = Helpers;