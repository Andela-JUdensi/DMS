'use strict';

var _nodeMocksHttp = require('node-mocks-http');

var _nodeMocksHttp2 = _interopRequireDefault(_nodeMocksHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _controllers = require('../../../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();

var responseEvent = function responseEvent() {
  return _nodeMocksHttp2.default.createResponse({ eventEmitter: _events2.default.EventEmitter });
};

describe('Users controller', function () {

  it('should return `bad request` if record is not complete', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'POST',
      url: '/api/users/',
      locals: {
        userInput: {
          username: 'super',
          firstname: 'kakashi',
          lastname: 'mightguy',
          email: 'fantasy@movies',
          password: 'password123'
        }
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.message.should.eql('Validation error: the email you entered is not valid');
      response._getStatusCode().should.eql(400);
      done();
    });
    _controllers.UsersController.create(request, response);
  });

  it('should return `success` if record is complete', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'POST',
      url: '/api/users/',
      locals: {
        userInput: {
          username: 'super',
          firstname: 'kakashi',
          lastname: 'mightguy',
          email: 'fantasy@movies.com',
          password: 'password123'
        }
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.message.should.eql('account created successfully');
      data.user.email.should.eql('fantasy@movies.com');
      done();
    });
    _controllers.UsersController.create(request, response);
  });

  it('findAll method should accept limit query', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/',
      query: {
        limit: 10
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.rows.length.should.eql(10);
      data.should.have.property('count');
      done();
    });
    _controllers.UsersController.findAll(request, response);
  });

  it('findAll return error for wrong query limit', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/',
      query: {
        limit: 'abcd'
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.message.should.eql('invalid input syntax for integer: "abcd"');
      response.statusCode.should.eql(400);
      done();
    });
    _controllers.UsersController.findAll(request, response);
  });

  it('findOne return one user', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/',
      params: {
        id: '1'
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.username.should.eql('SiliconValley');
      response.statusCode.should.eql(200);
      done();
    });
    _controllers.UsersController.findOne(request, response);
  });

  it('findOne return `404` if user is not found', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/',
      params: {
        id: 1000
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.message.should.eql('user not found');
      response.statusCode.should.eql(404);
      done();
    });
    _controllers.UsersController.findOne(request, response);
  });

  it('findOne return `bad request` for wrong params', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/',
      params: {
        id: 'dbvjhv'
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.message.should.eql('invalid input syntax for integer: "dbvjhv"');
      response.statusCode.should.eql(400);
      done();
    });
    _controllers.UsersController.findOne(request, response);
  });

  it('documentsByUser return documents by one User', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/:id/documents/',
      params: {
        id: 1
      },
      locals: {
        user: {
          decoded: {
            userId: 0,
            roleId: 0
          }
        }
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.count.should.be.gte(1);
      response.statusCode.should.eql(200);
      done();
    });
    _controllers.UsersController.documentsByUser(request, response);
  });

  it('documentsByUser return `404` if no document found', function (done) {
    var response = responseEvent();
    var request = _nodeMocksHttp2.default.createRequest({
      method: 'GET',
      url: '/api/users/:id/documents/',
      params: {
        id: 21
      },
      locals: {
        user: {
          decoded: {
            userId: 0,
            roleId: 0
          }
        }
      }
    });
    response.on('end', function () {
      var data = JSON.parse(response._getData());
      data.message.should.eql('no document found');
      response.statusCode.should.eql(404);
      done();
    });
    _controllers.UsersController.documentsByUser(request, response);
  });
});