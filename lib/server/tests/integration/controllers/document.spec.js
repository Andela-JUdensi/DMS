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
var authenticatedUser = void 0;

describe('The document API', function () {

  describe('for authenticated users', function () {
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
    it('should return `success` creating a new document with valid records', function (done) {
      _chai2.default.request(_server2.default).post('/api/documents/').set('authorization', 'bearer ' + authenticatedUser.token).send({
        title: 'Introduction to common sense ' + Date.now(),
        body: 'common sense is the most widely shared commodity.',
        access: 'public'
      }).end(function (err, res) {
        res.body.should.be.an('object');

        done();
      });
    });
    it('should return `bad request` to create with invalid records', function (done) {
      _chai2.default.request(_server2.default).post('/api/documents/').set('authorization', 'bearer ' + authenticatedUser.token).send({
        title: 'Int',
        body: 'Rene Descartes wrote “common sense is the most widely shared commodity.',
        access: 'public'
      }).end(function (err, res) {
        res.body.message.should.eql('document title must be between 5 and 100 characters');
        done();
      });
    });

    it('should return all documents based on user privilege', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(200);
        res.body.count.should.be.a('number');
        res.body.rows.should.be.an('array');
        done();
      });
    });
    it('should return one document, based on parameter', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/2').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(200);
        res.body.access.should.eql('role');
        res.body.title.should.eql('who moved my cheese');
        done();
      });
    });
    it('should return `not found`, if document is not found', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/100').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(404);
        res.body.message.should.eql('document not found');
        done();
      });
    });
    it('return `bad request` in request with an invalid id', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/abcde').set('authorization', 'bearer ' + authenticatedUser.token).end(function (err, res) {
        res.should.have.status(400);
        res.body.message.should.eql('provide a valid document id');
        done();
      });
    });
    it('should return `you are not authorized` in request to update document above access level', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/3').set('authorization', 'bearer ' + authenticatedUser.token).send({ title: 'A Place Called Zero' }).end(function (err, res) {
        res.body.message.should.eql('you are not authorized');
        done();
      });
    });
    it('should return `document not found` in request to update document not available', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/100').set('authorization', 'bearer ' + authenticatedUser.token).send({ title: 'A Discuss about Unexistence' }).end(function (err, res) {
        res.body.message.should.eql('document not found');
        done();
      });
    });
    it('should return updated document', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/1').set('authorization', 'bearer ' + authenticatedUser.token).set('authorization', 'bearer ' + authenticatedUser.token).send({ title: 'The Bounds of Reason ' + Date.now() }).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
    it('should return `document not found` in request to delete unavailable document', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/100').set('authorization', 'bearer ' + authenticatedUser.token).send({ title: 'A Discuss about Unexistence' }).end(function (err, res) {
        res.body.message.should.eql('document not found');
        done();
      });
    });
  });

  describe('for unauthenticated users', function () {
    it('should respond with success', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/').end(function (error, response) {
        response.body.should.be.an('object');
        response.status.should.equal(200);
        response.body.rows['1'].should.have.keys(['User', 'access', 'body', 'createdAt', 'id', 'ownerID', 'title', 'updatedAt']);
        done();
      });
    });
    it('should return only public documents without authentication', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/').end(function (error, response) {
        response.body.should.be.an('object');
        response.body.rows['1'].access.should.equal('public');
        response.body.rows['2'].access.should.be.a('string');
        response.body.rows['3'].access.should.not.equal('private');
        response.body.rows['3'].access.should.not.equal('role');
        done();
      });
    });
    it('should return only 12 public documents without authentication by default', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/').end(function (error, response) {
        response.body.rows.length.should.be.a('number');
        response.body.rows.length.should.be.lte(12);
        response.body.rows.length.should.not.be.lte(-1);
        response.body.rows.length.should.not.be.gte(13);
        done();
      });
    });
    it('should return `you are not signed in` in attempt to create a document', function (done) {
      _chai2.default.request(_server2.default).post('/api/documents/').send({
        title: 'My awesome title',
        body: 'my wonderful document content',
        ownerID: 1,
        access: 'public'
      }).end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
    it('should return `you are not signed in` in attempt to `update` a document', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/5').send({
        title: 'My awesome title',
        body: 'my wonderful document content',
        ownerID: 1,
        access: 'public'
      }).end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
    it('should return `success` in request to a `public` document without authentication', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/1').end(function (error, response) {
        response.status.should.equal(200);

        done();
      });
    });
    it('should return `document not found` in request to a `private` document without authentication', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/3').end(function (error, response) {
        response.status.should.equal(404);
        response.body.message.should.equal('document not found');
        done();
      });
    });
    it('should return `document not found` in request to a `role` document without authentication', function (done) {
      _chai2.default.request(_server2.default).get('/api/documents/2').end(function (error, response) {
        response.status.should.equal(404);
        response.body.message.should.equal('document not found');
        done();
      });
    });
    it('should return `you are not signed in` in attempt to `update` a `role` document without authentication', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/2').send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' }).end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
    it('should return `you are not signed in` in attempt to `update` a `private` document without authentication', function (done) {
      _chai2.default.request(_server2.default).put('/api/documents/3').send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' }).end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
    it('should return `you are not signed in` in attempt to `delete` a `public` document without authentication', function (done) {
      _chai2.default.request(_server2.default).delete('/api/documents/1').end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
    it('should return `you are not signed in` in attempt to `delete` a `role` document without authentication', function (done) {
      _chai2.default.request(_server2.default).delete('/api/documents/2').end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
    it('should return `you are not signed in` in attempt to `delete` a `private` document without authentication', function (done) {
      _chai2.default.request(_server2.default).delete('/api/documents/3').end(function (error, response) {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
    });
  });
});