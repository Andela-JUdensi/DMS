'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('The user authentication API', function () {
  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, 2000);
  });

  var authenticatedUser = void 0;
  describe('the login route', function () {
    describe('for valid users', function () {
      it('should login an existing user with valid username and password', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'SiliconValley',
          password: 'password123'
        }).end(function (err, res) {
          authenticatedUser = res.body;
          res.should.have.status(200);
          done();
        });
      });
      it('should login an existing user with valid email and password', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'ajudensi@breed101.com',
          password: 'password123'
        }).end(function (err, res) {
          authenticatedUser = res.body;
          res.should.have.status(200);
          res.body.status.should.eql('true');
          _jsonwebtoken2.default.decode(res.body.token).roleId.should.eql(2);
          done();
        });
      });
      it('should generate an access token for a valid user', function (done) {
        should.exist(authenticatedUser.token);
        done();
      });
      it('should return `404` if user does not exist', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'idont@exist.com',
          password: 'password123'
        }).end(function (err, res) {
          res.should.have.status(404);
          res.body.message.should.eql('You don\'t exist');
          done();
        });
      });
      it('should return `bad request` for bad credentials', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'idont@exist.com',
          password: 'password123'
        }).end(function (err, res) {
          res.should.have.status(404);
          res.body.message.should.eql('You don\'t exist');
          done();
        });
      });
    });

    describe('the logout route', function () {
      it('should log a user out', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/logout/').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
          res.should.have.status(200);
          res.body.message.should.eql('logout successful');
          done();
        });
      });
      it('should prevent a user from authenticated actions', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/users/').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
          res.should.have.status(401);
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });
    });

    describe('for invalid users', function () {
      it('should invalidate wrong credentials', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'somefaker@dude.com',
          password: 'whateverpassword'
        }).end(function (err, res) {
          res.should.have.status(404);
          res.body.message.should.eql('You don\'t exist');
          done();
        });
      });
      it('should invalidate users with wrong password', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'SiliconValley',
          password: 'trysomethingfake'
        }).end(function (err, res) {
          res.should.have.status(401);
          res.body.message.should.eql('wrong login credentials');
          done();
        });
      });
      it('should invalidate users without a token', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/users/').end(function (err, res) {
          res.should.have.status(401);
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });
      it('should invalidate users with a wrong token', function (done) {
        _chai2.default.request(_server2.default).get('/api/users/').set('authorization', 'bearer 1234567890abcdefgh').end(function (err, res) {
          res.should.have.status(401);
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });
      it('should invalidate users with no password or identfier', function (done) {
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'SiliconValley'
        }).end(function (err, res) {
          res.should.have.status(400);
          res.body.message.should.eql('username and password are required');
          done();
        });
      });
    });
  });
});