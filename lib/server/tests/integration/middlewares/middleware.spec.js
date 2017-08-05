'use strict';

var _nodeMocksHttp = require('node-mocks-http');

var _nodeMocksHttp2 = _interopRequireDefault(_nodeMocksHttp);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _server = require('../../../server');

var _server2 = _interopRequireDefault(_server);

var _middlewares = require('../../../middlewares/');

var middlewares = _interopRequireWildcard(_middlewares);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.should();
var responseEvent = function responseEvent() {
  return _nodeMocksHttp2.default.createResponse({ eventEmitter: _events2.default.EventEmitter });
};

describe('Middlewares', function () {
  var superAdminToken = void 0,
      adminToken = void 0,
      regularToken = void 0;
  var superAdmin = void 0,
      admin = void 0,
      regular = void 0;
  var request = void 0;

  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, 2000);
  });

  before(function (done) {
    _chai2.default.request(_server2.default).post('/api/users/login/').send({
      identifier: 'ajudensi',
      password: 'password123'
    }).end(function (err, res) {
      superAdminToken = res.body.token;
      superAdmin = res.body;
      _chai2.default.request(_server2.default).post('/api/users/login/').send({
        identifier: 'SiliconValley',
        password: 'password123'
      }).end(function (err, res) {
        adminToken = res.body.token;
        admin = res.body;
        _chai2.default.request(_server2.default).post('/api/users/login/').send({
          identifier: 'thePiper',
          password: 'password123'
        }).end(function (err, res) {
          regularToken = res.body.token;
          regular = res.body;
          done();
        });
      });
    });
  });

  describe('verifyAuthentication', function () {
    it('should continue if token is valid', function (done) {
      var response = _nodeMocksHttp2.default.createResponse();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'GET',
        url: '/api/users/',
        headers: { authorization: superAdminToken }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      middlewares.verifyAuthentication(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });

    it('should not continue if token is invalid', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'GET',
        url: '/api/search/users/',
        headers: {
          authorization: 'bearer abcdefghijklmnopqrstuvwxyz1234567890'
        },
        locals: {
          user: {
            decoded: { userId: 0, roleId: 0 },
            isAuthenticated: false
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('you are not signed in');
        done();
      });
      middlewares.verifyRouteAndMethod(request, response, middlewareStub.callback);
    });
  });

  describe('validateDeleteUser', function () {
    it('should only allow superadmin and account owner to delete account', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'DELETE',
        url: '/api/users/1',
        headers: { authorization: regularToken },
        locals: {
          user: {
            decoded: {
              roleId: regular.roleId,
              userId: regular.userId
            }
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('you cannot perform this action');
        done();
      });
      middlewares.validateDeleteUser(request, response, middlewareStub.callback);
    });

    it('should not allow admin to delete accounts', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'DELETE',
        url: '/api/users/10',
        headers: { authorization: 'bearer ' + adminToken },
        locals: {
          user: {
            decoded: {
              roleId: admin.roleId,
              userId: admin.userId
            }
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('you cannot perform this action');
        done();
      });
      middlewares.validateDeleteUser(request, response, middlewareStub.callback);
    });

    it('should allow superadmin to delete account', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'DELETE',
        url: '/api/users/10',
        headers: { authorization: 'bearer ' + superAdminToken },
        locals: {
          user: {
            decoded: {
              roleId: superAdmin.roleId,
              userId: superAdmin.userId
            }
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      middlewares.validateDeleteUser(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });
  });

  describe('validateUserInput', function () {
    it('should return `bad request` when email is empty', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users',
        body: {
          username: 'kingsLanding',
          email: '',
          firstname: 'tyrion',
          lastname: 'lannister',
          password: 'terribleLannister'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid email');
        response._isJSON().should.eql(true);
        response.statusCode.should.eql(400);
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when username is empty', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          username: '',
          email: 'test@test.com',
          firstname: 'tyrion',
          lastname: 'lannister',
          password: 'terribleLannister'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid username');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when firstname is empty', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          username: 'kingsLanding',
          email: 'test@test.com',
          firstname: '',
          lastname: 'lannister',
          password: 'terribleLannister'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid firstname');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when lastname is empty', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          username: 'kingsLanding',
          email: 'test@test.com',
          firstname: 'tyrion',
          lastname: '',
          password: 'terribleLannister'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid lastname');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when roleId is 1', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          roleId: 1,
          username: 'kingsLanding',
          email: 'test@test.com',
          firstname: 'tyrion',
          lastname: 'lannister',
          password: 'terribleLannister'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('you cannot signup with this priviledge');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should continue when all the fields are complete', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/users',
        body: {
          username: 'chieka',
          firstname: 'ebere',
          lastname: 'samuel',
          email: 'chieke@ebere.com',
          password: 'password123'
        },
        locals: {}
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      middlewares.validateUserInput(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });
  });

  describe('validateLoginInput', function () {
    it('should continue when email and password is provided', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users/login/',
        body: {
          email: 'thePiper',
          password: 'password123'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      middlewares.validateLoginInput(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });

    it('should not continue when password is null', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/users/login',
        body: {
          email: 'kk@mail.com'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('username and password are required');
      });
      middlewares.validateLoginInput(request, response, middlewareStub.callback);
    });
  });

  describe('validateUserUpdate', function () {
    it('should not continue when user want to modify admin profile', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'PUT',
        url: '/api/users/',
        params: {
          id: '2'
        },
        body: {
          email: 'admin@email.com'
        },
        locals: {
          user: {
            decoded: {}
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('you cannot modify this user');
      });
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
    });

    it('should continue when user is the owner', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'PUT',
        url: '/api/users/2',
        headers: { authorization: 'bearer ' + regularToken },
        body: {
          username: 'petertosh'
        },
        params: {
          id: regular.id
        },
        locals: {
          user: {
            decoded: { roleId: regular.roleId, userId: regular.userId }
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
      middlewareStub.callback.should.not.have.been.called;
      done();
    });

    it('should continue when user is the owner', function (done) {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'PUT',
        url: '/api/users/2',
        headers: { authorization: 'bearer ' + regularToken },
        body: {
          username: 'petertosh'
        },
        params: {
          id: regular.id
        },
        locals: {
          user: {
            decoded: { roleId: regular.roleId, userId: regular.userId }
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
      middlewareStub.callback.should.not.have.been.called;
      done();
    });

    it('should return `bad request` trying to modify locked account', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'PUT',
        url: '/api/users',
        body: {
          username: 'noone',
          email: 'arya@stark.com',
          firstname: 'arya',
          lastname: 'stark',
          password: 'nooneispassword'
        },
        params: { id: 1 },
        locals: {
          user: {
            decoded: {
              roleId: 3,
              userId: 5
            }
          }
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        data.message.should.eql('you are not permitted');
        response._isJSON().should.eql(true);
        response.statusCode.should.eql(401);
      });
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
    });
  });

  describe('validateDocumentInput', function () {
    it('it should return `bad request if case of an an empty title', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          body: 'Okonkwo was well known throughout the nine villages and even beyond'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('enter valid title');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return `bad request if case of an an empty access', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'things fall apart'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('enter valid access');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return `bad request if case of an an empty content', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'things fall apart',
          access: 'public'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('enter valid content');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return `bad request if case of an an ivalid title length', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'abc',
          access: 'public',
          body: 'Okonkwo was well known throughout the nine villages and even beyond'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('document title must be between 5 and 100 characters');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return bad request if title already exist', function () {
      var response = responseEvent();
      request = _nodeMocksHttp2.default.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'who moved my cheese',
          access: 'public',
          body: 'Okonkwo was well known throughout the nine villages and even beyond'
        }
      });
      var middlewareStub = {
        callback: function callback() {}
      };
      _sinon2.default.spy(middlewareStub, 'callback');
      response.on('end', function () {
        var data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('document with title already exist');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });
  });
});