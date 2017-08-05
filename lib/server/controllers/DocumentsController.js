'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dependencies = require('./dependencies');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentsController = function () {
  function DocumentsController() {
    _classCallCheck(this, DocumentsController);
  }

  _createClass(DocumentsController, null, [{
    key: 'create',
    value: function create(req, res) {
      var ownerID = req.locals.user.decoded.userId;
      var _req$locals$documentI = req.locals.documentInput,
          title = _req$locals$documentI.title,
          body = _req$locals$documentI.body,
          access = _req$locals$documentI.access;

      _dependencies.Documents.create({
        title: title,
        body: body,
        access: access,
        ownerID: ownerID
      }).then(function (document) {
        return _dependencies.Response.created(res, document);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'findAll',
    value: function findAll(req, res) {
      var _req$query = req.query,
          _req$query$limit = _req$query.limit,
          limit = _req$query$limit === undefined ? 12 : _req$query$limit,
          _req$query$offset = _req$query.offset,
          offset = _req$query$offset === undefined ? 0 : _req$query$offset,
          _req$query$orderBy = _req$query.orderBy,
          orderBy = _req$query$orderBy === undefined ? 'createdAt' : _req$query$orderBy,
          _req$query$order = _req$query.order,
          order = _req$query$order === undefined ? 'ASC' : _req$query$order,
          _req$query$access = _req$query.access,
          access = _req$query$access === undefined ? 'all' : _req$query$access;
      var _req$locals$user$deco = req.locals.user.decoded,
          userId = _req$locals$user$deco.userId,
          roleId = _req$locals$user$deco.roleId;

      var query = _dependencies.Helpers.determineDocsforUser(userId, roleId, access);
      _dependencies.Documents.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [[orderBy, order]],
        include: {
          model: _dependencies.Users,
          attributes: ['id', 'username', 'roleId'],
          where: {
            roleId: { $gte: roleId }
          }
        },
        where: query
      }).then(function (allDocuments) {
        if (allDocuments.length < 1) {
          return _dependencies.Response.notFound(res, 'no document found');
        }

        var pagination = _dependencies.Helpers.paginate(allDocuments, offset, limit);
        var result = Object.assign(allDocuments, pagination);

        _dependencies.Response.success(res, result);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(req, res) {
      var id = req.params.id;

      if (!parseInt(id, 10)) {
        return _dependencies.Response.badRequest(res, 'provide a valid document id');
      }
      var _req$locals$user$deco2 = req.locals.user.decoded,
          userId = _req$locals$user$deco2.userId,
          roleId = _req$locals$user$deco2.roleId;

      var query = _dependencies.Helpers.determineDocsforUser(userId, roleId, 'all');

      _dependencies.Documents.findOne({
        include: {
          model: _dependencies.Users,
          attributes: ['id', 'username', 'roleId'],
          where: {
            roleId: { $gte: roleId }
          }
        },
        where: {
          id: id,
          $or: query
        }
      }).then(function (document) {
        if (!document) return _dependencies.Response.notFound(res, 'document not found');
        return _dependencies.Response.success(res, document);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      req.locals.documentToUpdate.update(_dependencies.lodash.pick(req.body, ['title', 'body', 'access'])).then(function (updatedDocument) {
        return _dependencies.Response.success(res, updatedDocument);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      req.locals.documentToBeDeleted.destroy({
        where: {
          id: req.locals.documentToBeDeleted.id
        }
      }).then(function (document) {
        if (!document) return _dependencies.Response.notFound(res, 'document not found');
        return _dependencies.Response.success(res, { status: 'deleted' });
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }]);

  return DocumentsController;
}();

exports.default = DocumentsController;