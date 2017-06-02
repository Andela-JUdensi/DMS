import httpMocks from 'node-mocks-http';
import chai from 'chai';
import events from 'events';
import { UsersController } from '../../../controllers';

chai.should();

const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe('Users controller', () => {
  it('should return `bad request` if record is not complete', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
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
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.message.should.eql('Validation error: the email you entered is not valid');
      response._getStatusCode().should.eql(400);
      done();
    });
    UsersController.create(request, response);
  });

  it('should return `success` if record is complete', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
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
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.message.should.eql('account created successfully');
      data.user.firstname.should.eql('kakashi');
      data.user.roleId.should.eql(3);
      done();
    });
    UsersController.create(request, response);
  });

  it('findAll method should accept limit query', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users/',
      query: {
        limit: 10,
      },
    });
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.rows.length.should.eql(10);
      data.should.have.property('count');
      done();
    });
    UsersController.findAll(request, response);
  });

  it('findAll return error for wrong query limit', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users/',
      query: {
        limit: 'abcd',
      },
    });
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.message.should.eql('invalid input syntax for integer: "abcd"');
      response.statusCode.should.eql(400);
      done();
    });
    UsersController.findAll(request, response);
  });

  it('findOne return one user', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users/',
      params: {
        id: '1',
      },
    });
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.username.should.eql('SiliconValley');
      response.statusCode.should.eql(200);
      done();
    });
    UsersController.findOne(request, response);
  });

  it('findOne return `404` if user is not found', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users/',
      params: {
        id: 1000,
      },
    });
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.message.should.eql('user not found');
      response.statusCode.should.eql(404);
      done();
    });
    UsersController.findOne(request, response);
  });

  it('findOne return `bad request` for wrong params', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/api/users/',
      params: {
        id: 'dbvjhv',
      },
    });
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.message.should.eql('invalid input syntax for integer: "dbvjhv"');
      response.statusCode.should.eql(400);
      done();
    });
    UsersController.findOne(request, response);
  });

  it('documentsByUser return documents by one User', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
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
      },
    });
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.count.should.be.gte(1);
      response.statusCode.should.eql(200);
      done();
    });
    UsersController.documentsByUser(request, response);
  });

  it('documentsByUser return `404` if no document found', (done) => {
    const response = responseEvent();
    const request = httpMocks.createRequest({
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
    response.on('end', () => {
      const data = JSON.parse(response._getData());
      data.message.should.eql('no document found');
      response.statusCode.should.eql(404);
      done();
    });
    UsersController.documentsByUser(request, response);
  });
});
