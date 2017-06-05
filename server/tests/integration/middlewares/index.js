import httpMocks from 'node-mocks-http';
import events from 'events';
import chaiHttp from 'chai-http';
import chai from 'chai';
import sinon from 'sinon';
import server from '../../../server';
import middlewares from '../../../middlewares/';

chai.use(chaiHttp);
chai.should();
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe('Middlewares', () => {
  let superAdminToken, adminToken, regularToken;
  let superAdmin, admin, regular;
  // let publicDocument, privateDocument, roleDocument;
  let request;

  before((done) => {
    chai.request(server)
      .post('/api/users/login/')
      .send({
        identifier: 'ajudensi',
        password: 'password123',
      })
      .end((err, res) => {
        superAdminToken = res.body.token;
        superAdmin = res.body;
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'SiliconValley',
            password: 'password123',
          })
          .end((err, res) => {
            adminToken = res.body.token;
            admin = res.body;
            chai.request(server)
              .post('/api/users/login/')
              .send({
                identifier: 'thePiper',
                password: 'password123',
              })
              .end((err, res) => {
                regularToken = res.body.token;
                regular = res.body;
                done();
              });
          });
      });
  });

  describe('verifyAuthentication', () => {
    it('should continue if token is valid', (done) => {
      const response = httpMocks.createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users/',
        headers: { authorization: superAdminToken }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      middlewares.verifyAuthentication(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });

    it('should not continue if token is invalid', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/search/users/',
        headers: {
          authorization: 'bearer abcdefghijklmnopqrstuvwxyz1234567890',
        },
        locals: {
          user: {
            decoded: { userId: 0, roleId: 0 },
            isAuthenticated: false
          }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('you are not signed in');
        done();
      });
      middlewares.verifyRouteAndMethod(request, response, middlewareStub.callback);
    });
  });

  describe('validateDeleteUser', () => {
    it('should only allow superadmin and account owner to delete account', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
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
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('you cannot perform this action');
        done();
      });
      middlewares.validateDeleteUser(request, response, middlewareStub.callback);
    });

    it('should not allow admin to delete accounts', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/users/10',
        headers: { authorization: `bearer ${adminToken}` },
        locals: {
          user: {
            decoded: {
              roleId: admin.roleId,
              userId: admin.userId
            }
          }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('you cannot perform this action');
        done();
      });
      middlewares.validateDeleteUser(request, response, middlewareStub.callback);
    });

    it('should allow superadmin to delete account', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/api/users/10',
        headers: { authorization: `bearer ${superAdminToken}` },
        locals: {
          user: {
            decoded: {
              roleId: superAdmin.roleId,
              userId: superAdmin.userId
            }
          }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      middlewares.validateDeleteUser(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });
  });

  describe('validateUserInput', () => {
    it('should return `bad request` when email is empty', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users',
        body: {
          firstname: 'thePiper',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid email');
        response._isJSON().should.eql(true);
        response.statusCode.should.eql(400);
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });
    it('should return `bad request` when username is empty', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          username: '',
          email: 'test@test.com'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid username');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when firstname is empty', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          firstname: '',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid firstname');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when lastname is empty', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          lastname: '',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('enter a valid lastname');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should return `bad request` when roleId is 1', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/',
        body: {
          roleId: 1,
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('you cannot signup with this priviledge');
        done();
      });
      middlewares.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should continue when all the fields are complete', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
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
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      middlewares.validateUserInput(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });
  });

  describe('validateLoginInput', () => {
    it('should continue when email and password is provided', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login/',
        body: {
          email: 'thePiper',
          password: 'password123'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      middlewares.validateLoginInput(request, response, middlewareStub.callback);
      middlewareStub.callback.should.have.been.called;
      done();
    });

    it('should not continue when password is null', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
        body: {
          email: 'kk@mail.com',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('username and password are required');
      });
      middlewares.validateLoginInput(request, response, middlewareStub.callback);
    });
  });

  describe('validateUserUpdate', () => {
    it('should not continue when user want to modify admin profile', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/',
        params: {
          id: '2'
        },
        body: {
          email: 'admin@email.com',
        },
        locals: {
          user: {
            decoded: {}
          }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        data.message.should.eql('you cannot modify this user');
      });
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
    });

    it('should continue when user is the owner', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/2',
        headers: { authorization: `bearer ${regularToken}` },
        body: {
          username: 'petertosh',
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
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
      middlewareStub.callback.should.not.have.been.called;
      done();
    });


    it('should continue when user is the owner', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/users/2',
        headers: { authorization: `bearer ${regularToken}` },
        body: {
          username: 'petertosh',
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
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      middlewares.validateUserUpdate(request, response, middlewareStub.callback);
      middlewareStub.callback.should.not.have.been.called;
      done();
    });
  });

  describe('validateDocumentInput', () => {
    it('it should return `bad request if case of an an empty title', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          body: 'Okonkwo was well known throughout the nine villages and even beyond',
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('enter valid title');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return `bad request if case of an an empty access', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'things fall apart',
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('enter valid access');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return `bad request if case of an an empty content', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'things fall apart',
          access: 'public'
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('enter valid content');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return `bad request if case of an an ivalid title length', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'abc',
          access: 'public',
          body: 'Okonkwo was well known throughout the nine villages and even beyond'
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('document title must be between 5 and 100 characters');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });

    it('it should return bad request if title already exist', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/documents/',
        headers: { authorization: regularToken },
        body: {
          title: 'who moved my cheese',
          access: 'public',
          body: 'Okonkwo was well known throughout the nine villages and even beyond'
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        const data = JSON.parse(response._getData());
        response.statusCode.should.eql(400);
        data.message.should.eql('document with title already exist');
      });
      middlewares.validateDocumentInput(request, response, middlewareStub.callback);
    });
  });
});
