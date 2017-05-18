// import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

process.NODE_ENV = 'test';

describe('Document route and model', () => {
  it.skip('should respond with success without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/')
      .end((error, response) => {
        response.body.should.be.an('object');
        response.status.should.equal(200);
        response.body.rows['1'].should.have.keys(['User', 'access', 'body',
          'createdAt', 'id', 'ownerID', 'title', 'updatedAt']);
        done();
      });
  });

  it('should return only public documents without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/')
      .end((error, response) => {
        response.body.should.be.an('object');
        response.body.rows['1'].access.should.equal('public');
        response.body.rows['2'].access.should.be.a('string');
        response.body.rows['3'].access.should.not.equal('private');
        response.body.rows['3'].access.should.not.equal('role');
        done();
      });
  });

  it('should return only 12 public documents without authentication by default', (done) => {
    chai.request(server)
      .get('/api/documents/')
      .end((error, response) => {
        response.body.rows.length.should.be.a('number');
        response.body.rows.length.should.be.lte(12);
        response.body.rows.length.should.not.be.lte(-1);
        response.body.rows.length.should.not.be.gte(13);
        done();
      });
  });

  it('should return `you are not signed in` in attempt to create a document without authentication', (done) => {
    chai.request(server)
      .post('/api/documents/')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });

  it('should return `document not found` in request to a `private` document without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/4')
      .end((error, response) => {
        response.status.should.equal(404);
        response.body.message.should.equal('document not found');
        done();
      });
  });

  it('should return `document not found` in request to a `role` document without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/4')
      .end((error, response) => {
        response.status.should.equal(404);
        response.body.message.should.equal('document not found');
        done();
      });
  });

  it('should return `success` in request to a `public` document without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/2')
      .end((error, response) => {
        response.status.should.equal(200);
        response.body.should.be.an('object');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `update` a `public` document without authentication', (done) => {
    chai.request(server)
      .put('/api/documents/5')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `update` a `role` document without authentication', (done) => {
    chai.request(server)
      .put('/api/documents/4')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `update` a `private` document without authentication', (done) => {
    chai.request(server)
      .put('/api/documents/2')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `delete` a `public` document without authentication', (done) => {
    chai.request(server)
      .delete('/api/documents/5')
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `delete` a `role` document without authentication', (done) => {
    chai.request(server)
      .delete('/api/documents/4')
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `delete` a `private` document without authentication', (done) => {
    chai.request(server)
      .delete('/api/documents/2')
      .end((error, response) => {
        response.status.should.equal(401);
        response.body.message.should.equal('you are not signed in');
        done();
      });
  });
});
