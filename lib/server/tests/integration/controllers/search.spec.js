'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('The Search API', function () {

  describe('for Unauthenticated users', function () {
    describe('searching for a user', function () {
      it('should not return `not signed in` for unauthenticated users', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/users/?q=ajudensi').end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });
    });

    describe('searching for a document', function () {
      it('should return public documents for unauthenticated users', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/documents/?q=a very random title').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.count.should.be.gte(1);
          res.body.rows.should.be.an('array');
          done();
        });
      });

      it('should return `0 count` searching for a private document by unauthenticated user', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/documents/?q=zero').end(function (err, res) {
          res.should.have.status(200);
          res.body.count.should.eql(0);
          done();
        });
      });

      it('should return `0 count` searching for a role document by unauthenticated user', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/documents/?q=cheese').end(function (err, res) {
          res.should.have.status(200);
          res.body.count.should.eql(0);
          done();
        });
      });
    });
  });

  describe('for Authenticated users', function () {
    var authenticatedUser = void 0;
    beforeEach(function (done) {
      _chai2.default.request(_server2.default).post('/api/users/login/').send({
        identifier: 'SiliconValley',
        password: 'password123'
      }).end(function (err, res) {
        authenticatedUser = res.body;
        res.should.have.status(200);
        done();
      });
    });
    describe('searching for a user', function () {
      it('should return `actual user` for authenticated users', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/users/?q=ajudensi').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.rows.should.be.instanceof(Array);
          res.body.rows[0].username.should.eql('ajudensi');
          done();
        });
      });
    });

    describe('searching for a document', function () {
      it('should not return `bad request` for authenticated users', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/documents/?q=cheese').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
          res.should.not.have.status(401);
          res.body.should.be.an('object');
          done();
        });
      });

      it('should not return priviledged documents for authenticated users', function (done) {
        _chai2.default.request(_server2.default).get('/api/search/documents/?q=cheese').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
          res.body.count.should.be.gte(1);
          res.body.rows[0].title.should.eql('who moved my cheese');
          res.should.not.have.status(401);
          res.body.rows.should.be.an('array');
          done();
        });
      });
    });
  });
});