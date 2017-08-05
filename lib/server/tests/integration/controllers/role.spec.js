'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('Role API', function () {

  it('should not create role if user is not signed in', function (done) {
    _chai2.default.request(_server2.default).post('/api/roles/').send({
      roleName: 'random role',
      describe: 'description for a random role'
    }).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.an('object');
      res.body.message.should.eql('you are not signed in');
      done();
    });
  });

  describe('GET Role', function () {
    it('should not GET all the roles if not authorized', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/').end(function (err, res) {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.message.should.eql('you are not signed in');
        done();
      });
    });

    it('should not GET roles no token provided', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/1').end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.message.should.eql('you are not signed in');
        done();
      });
    });

    it('should not GET roles if the token provided is invalid', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/').set('authorization', 'bearer abcdefghijklmnop1234567890').end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.message.should.eql('you are not signed in');
        done();
      });
    });
  });

  describe('get roles route if user is authenticated', function () {
    var authenticatedUser = void 0;
    it('should login an existing user', function (done) {
      _chai2.default.request(_server2.default).post('/api/users/login/').send({
        identifier: 'ajudensi',
        password: 'password123'
      }).end(function (err, res) {
        authenticatedUser = res.body;
        res.should.have.status(200);
        done();
      });
    });

    it('should GET roles', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });

    it('should GET roles by roleId', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/1').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
    });

    it('should not GET un-existent roles by roleId', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/1000').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });

    it('should create new role if admin', function (done) {
      _chai2.default.request(_server2.default).post('/api/roles/').set('authorization', 'bearer ' + authenticatedUser.token).send({
        roleName: _faker2.default.commerce.department(),
        description: _faker2.default.lorem.sentence()
      }).end(function (err, res) {
        res.should.have.status(201);
        done();
      });
    });

    it('should return error if roleId is invalid in a get request', function (done) {
      _chai2.default.request(_server2.default).get('/api/roles/50').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });

    it('should delete any role if admin', function (done) {
      _chai2.default.request(_server2.default).delete('/api/roles/4').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});