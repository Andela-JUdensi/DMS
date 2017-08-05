'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dependencies = require('./dependencies');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RolesController = function () {
  function RolesController() {
    _classCallCheck(this, RolesController);
  }

  _createClass(RolesController, null, [{
    key: 'create',
    value: function create(req, res) {
      var roleId = req.locals.user.decoded.roleId;

      if (roleId !== 1) {
        _dependencies.Response.unAuthorized(res, 'you are not authorized');
      }
      var roleData = _dependencies.lodash.pick(req.body, ['roleName', 'description']);

      _dependencies.Roles.create(roleData).then(function (role) {
        return _dependencies.Response.created(res, role);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error);
      });
    }
  }, {
    key: 'findAll',
    value: function findAll(req, res) {
      var _req$query = req.query,
          _req$query$limit = _req$query.limit,
          limit = _req$query$limit === undefined ? 10 : _req$query$limit,
          _req$query$offset = _req$query.offset,
          offset = _req$query$offset === undefined ? 0 : _req$query$offset,
          _req$query$orderBy = _req$query.orderBy,
          orderBy = _req$query$orderBy === undefined ? 'roleName' : _req$query$orderBy;


      _dependencies.Roles.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: ['id', 'roleName', 'createdAt', 'updatedAt'],
        order: [[orderBy, 'ASC']]
      }).then(function (role) {
        return _dependencies.Response.success(res, role);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(req, res) {
      var id = req.params.id;

      _dependencies.Roles.findOne({
        where: {
          id: id
        }
      }).then(function (role) {
        if (!role) return _dependencies.Response.notFound(res, 'role not found');
        _dependencies.Response.success(res, role);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var roleId = req.locals.user.decoded.roleId;

      if (roleId !== 1) {
        _dependencies.Response.unAuthorized(res, 'you are not authorized');
      }
      var id = req.params.id;

      _dependencies.Roles.findOne({
        where: {
          id: id
        }
      }).then(function (roleToUpdate) {
        if (!roleToUpdate) return _dependencies.Response.notFound(res, 'role not found');
        var fieldsToUpdate = _dependencies.lodash.pick(req.body, ['roleName', 'description']);

        roleToUpdate.updateAttributes(fieldsToUpdate).then(function (updatedRole) {
          return _dependencies.Response.success(res, updatedRole);
        }).catch(function (error) {
          return _dependencies.Response.internalError(res, error.message);
        });
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var roleId = req.locals.user.decoded.roleId;

      if (roleId !== 1) {
        _dependencies.Response.unAuthorized(res, 'you are not authorized');
      }
      var id = req.params.id;

      _dependencies.Roles.destroy({
        where: {
          id: id
        }
      }).then(function () {
        return _dependencies.Response.success(res, { status: true });
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }]);

  return RolesController;
}();

exports.default = RolesController;