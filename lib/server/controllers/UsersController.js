'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dependencies = require('./dependencies');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);

    this.secret = _dependencies.SERVER.JWT_SECRET;
  }

  _createClass(UsersController, null, [{
    key: 'create',
    value: function create(req, res) {
      var userData = _dependencies.lodash.pick(req.locals.userInput, ['firstname', 'lastname', 'username', 'email', 'password', 'roleId']);

      _dependencies.Users.create(userData).then(function (user) {
        return _dependencies.Response.created(res, {
          user: _dependencies.lodash.pick(user, ['username', 'email']),
          message: 'account created successfully'
        });
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'login',
    value: function login(req, res) {
      var _req$locals$userLogin = req.locals.userLogin,
          identifier = _req$locals$userLogin.identifier,
          password = _req$locals$userLogin.password;

      _dependencies.Users.findOne({
        where: {
          $or: {
            username: identifier,
            email: identifier
          }
        }
      }).then(function (user) {
        if (!user) return _dependencies.Response.notFound(res, 'You don\'t exist');
        if (user && user.validatePassword(password)) {
          var userCtrl = new UsersController();

          var token = _dependencies.jwt.sign({
            userId: user.id,
            username: user.username,
            roleId: user.roleId
          }, userCtrl.secret, {
            expiresIn: 86400
          });

          return res.status(200).send({
            token: token,
            status: 'true'
          });
        }
        return _dependencies.Response.unAuthorized(res, 'wrong login credentials');
      });
    }
  }, {
    key: 'logout',
    value: function logout(req, res) {
      var userId = req.locals.user.decoded.userId;

      _dependencies.Users.findOne({
        where: {
          id: userId
        }
      }).then(function () {
        _dependencies.Response.success(res, { message: 'logout successful' });
      });
    }
  }, {
    key: 'findAll',
    value: function findAll(req, res) {
      var _req$query = req.query,
          _req$query$limit = _req$query.limit,
          limit = _req$query$limit === undefined ? 5 : _req$query$limit,
          _req$query$offset = _req$query.offset,
          offset = _req$query$offset === undefined ? 0 : _req$query$offset,
          _req$query$orderBy = _req$query.orderBy,
          orderBy = _req$query$orderBy === undefined ? 'id' : _req$query$orderBy;

      _dependencies.Users.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: ['id', 'username', 'email', 'roleId'],
        order: [[orderBy, 'ASC']]
      }).then(function (users) {
        if (users) {
          var pagination = _dependencies.Helpers.paginate(users, offset, limit);
          var result = _extends({}, users, pagination);
          return _dependencies.Response.success(res, result);
        }
        return _dependencies.Response.notFound(res, 'no user found');
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(req, res) {
      var id = req.params.id;

      _dependencies.Users.findOne({
        where: {
          id: id
        },
        attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'createdAt', 'updatedAt', 'roleId']
      }).then(function (user) {
        if (!user) return _dependencies.Response.notFound(res, 'user not found');
        _dependencies.Response.success(res, user);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var fieldsToUpdate = _dependencies.lodash.pick(req.body, ['firstname', 'lastname', 'username', 'email', 'password', 'roleId']);
      req.locals.userToUpdate.update(fieldsToUpdate, {
        where: {
          id: req.locals.userToUpdate.id
        }
      }).then(function (updatedUser) {
        return _dependencies.Response.success(res, updatedUser);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      req.locals.userToBeDeleted.destroy().then(function () {
        return _dependencies.Response.success(res, { status: 'true' });
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }, {
    key: 'documentsByUser',
    value: function documentsByUser(req, res) {
      var _req$query2 = req.query,
          _req$query2$limit = _req$query2.limit,
          limit = _req$query2$limit === undefined ? 12 : _req$query2$limit,
          _req$query2$offset = _req$query2.offset,
          offset = _req$query2$offset === undefined ? 0 : _req$query2$offset;
      var id = req.params.id;
      var _req$locals$user$deco = req.locals.user.decoded,
          userId = _req$locals$user$deco.userId,
          roleId = _req$locals$user$deco.roleId;

      var query = _dependencies.Helpers.determineDocsforUser(userId, roleId, 'all');

      _dependencies.Documents.findAndCountAll({
        where: {
          ownerID: id,
          $or: query
        },
        include: {
          model: _dependencies.Users,
          attributes: ['id', 'username', 'roleId']
        }
      }).then(function (allDocuments) {
        if (allDocuments.count < 1) return _dependencies.Response.notFound(res, 'no document found');

        var pagination = _dependencies.Helpers.paginate(allDocuments, offset, limit);
        var result = _extends({}, allDocuments, pagination);

        _dependencies.Response.success(res, result);
      }).catch(function (error) {
        return _dependencies.Response.badRequest(res, error.message);
      });
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;