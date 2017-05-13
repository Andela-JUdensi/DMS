import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Document route and model', () => {
  it('should respond with success without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/')
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.status).to.equal(200);
        expect(response.body.rows['1']).to.have.keys(['User', 'access', 'body',
          'createdAt', 'id', 'ownerID', 'title', 'updatedAt']);
        done();
      });
  });

  it('should return only public documents without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/')
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.rows['1'].access).to.equal('public');
        expect(response.body.rows['2'].access).to.be.a('string');
        expect(response.body.rows['3'].access).not.to.equal('private');
        expect(response.body.rows['3'].access).not.to.equal('role');
        done();
      });
  });

  it('should return only 12 public documents without authentication by default', (done) => {
    chai.request(server)
      .get('/api/documents/')
      .end((error, response) => {
        expect(response.body.rows.length).to.be.a('number');
        expect(response.body.rows.length).to.be.lte(12);
        expect(response.body.rows.length).not.to.be.lte(-1);
        expect(response.body.rows.length).not.to.be.gte(13);
        done();
      });
  });

  it('should return `you are not signed in` in attempt to create a document without authentication', (done) => {
    chai.request(server)
      .post('/api/documents/')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });

  it('should return `document not found` in request to a `private` document without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/2')
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('document not found');
        done();
      });
  });

  it('should return `document not found` in request to a `role` document without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/4')
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('document not found');
        done();
      });
  });

  it('should return `success` in request to a `public` document without authentication', (done) => {
    chai.request(server)
      .get('/api/documents/5')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `update` a `public` document without authentication', (done) => {
    chai.request(server)
      .put('/api/documents/5')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `update` a `role` document without authentication', (done) => {
    chai.request(server)
      .put('/api/documents/4')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `update` a `private` document without authentication', (done) => {
    chai.request(server)
      .put('/api/documents/2')
      .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `delete` a `public` document without authentication', (done) => {
    chai.request(server)
      .delete('/api/documents/5')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `delete` a `role` document without authentication', (done) => {
    chai.request(server)
      .delete('/api/documents/4')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });

  it('should return `you are not signed in` in attempt to `delete` a `private` document without authentication', (done) => {
    chai.request(server)
      .delete('/api/documents/2')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('you are not signed in');
        done();
      });
  });
});
