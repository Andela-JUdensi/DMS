import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';

chai.should();
chai.use(chaiHttp);
let authenticatedUser;

describe('The document API', () => {
  // beforeEach((done) => {
  //   setTimeout(() => {
  //     done();
  //   }, 2000);
  // });

  describe('for authenticated users', () => {
    beforeEach((done) => {
      chai.request(server)
        .post('/api/users/login/')
        .send({
          identifier: 'SiliconValley',
          password: 'password123',
        })
        .end((err, res) => {
          authenticatedUser = res.body;
          res.should.have.status(200);
          done();
        });
    });
    it('should return `success` creating a new document with valid records', (done) => {
      chai.request(server)
        .post('/api/documents/')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .send({
          title: `Introduction to common sense ${Date.now()}`,
          body: 'common sense is the most widely shared commodity.',
          access: 'public'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          // res.body.access.should.eql('public');
          // res.body.body.should.eql('common sense is the most widely shared commodity.');
          done();
        });
    });
    it('should return `bad request` to create with invalid records', (done) => {
      chai.request(server)
        .post('/api/documents/')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .send({
          title: 'Int',
          body: 'Rene Descartes wrote “common sense is the most widely shared commodity.',
          access: 'public'
        })
        .end((err, res) => {
          res.body.message.should.eql('document title must be between 5 and 100 characters');
          done();
        });
    });

    it('should return all documents based on user privilege', (done) => {
      chai.request(server)
        .get('/api/documents/')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.count.should.be.a('number');
          res.body.rows.should.be.an('array');
          done();
        });
    });
    it('should return one document, based on parameter', (done) => {
      chai.request(server)
        .get('/api/documents/2')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.access.should.eql('role');
          res.body.title.should.eql('who moved my cheese');
          done();
        });
    });
    it('should return `not found`, if document is not found', (done) => {
      chai.request(server)
        .get('/api/documents/100')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('document not found');
          done();
        });
    });
    it('return `bad request` in request with an invalid id', (done) => {
      chai.request(server)
        .get('/api/documents/abcde')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql('provide a valid document id');
          done();
        });
    });
    it('should return `you are not authorized` in request to update document above access level', (done) => {
      chai.request(server)
        .put('/api/documents/3')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .send({ title: 'A Place Called Zero' })
        .end((err, res) => {
          res.body.message.should.eql('you are not authorized');
          done();
        });
    });
    it('should return `document not found` in request to update document not available', (done) => {
      chai.request(server)
        .put('/api/documents/100')
        .set('authorization', `bearer ${authenticatedUser.token}`)


        .send({ title: 'A Discuss about Unexistence' })
        .end((err, res) => {
          // res.should.have.status(404);
          res.body.message.should.eql('document not found');
          done();
        });
    });
    it('should return updated document', (done) => {
      chai.request(server)
        .put('/api/documents/1')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        .set('authorization', `bearer ${authenticatedUser.token}`)


        .send({ title: `The Bounds of Reason ${Date.now()}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return `document not found` in request to delete unavailable document', (done) => {
      chai.request(server)
        .put('/api/documents/100')
        .set('authorization', `bearer ${authenticatedUser.token}`)


        .send({ title: 'A Discuss about Unexistence' })
        .end((err, res) => {
          // res.should.have.status(404);
          res.body.message.should.eql('document not found');
          done();
        });
    });
  });

  describe('for unauthenticated users', () => {
    it('should respond with success', (done) => {
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
    it('should return `you are not signed in` in attempt to create a document', (done) => {
      chai.request(server)
        .post('/api/documents/')
        .send({
          title: 'My awesome title',
          body: 'my wonderful document content',
          ownerID: 1,
          access: 'public'
        })
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
    it('should return `you are not signed in` in attempt to `update` a document', (done) => {
      chai.request(server)
        .put('/api/documents/5')
        .send({
          title: 'My awesome title',
          body: 'my wonderful document content',
          ownerID: 1,
          access: 'public'
        })
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
    it('should return `success` in request to a `public` document without authentication', (done) => {
      chai.request(server)
        .get('/api/documents/1')
        .end((error, response) => {
          response.status.should.equal(200);
          // response.body.message.should.equal('document not found');
          done();
        });
    });
    it('should return `document not found` in request to a `private` document without authentication', (done) => {
      chai.request(server)
        .get('/api/documents/3')
        .end((error, response) => {
          response.status.should.equal(404);
          response.body.message.should.equal('document not found');
          done();
        });
    });
    it('should return `document not found` in request to a `role` document without authentication', (done) => {
      chai.request(server)
        .get('/api/documents/2')
        .end((error, response) => {
          response.status.should.equal(404);
          response.body.message.should.equal('document not found');
          done();
        });
    });
    it('should return `you are not signed in` in attempt to `update` a `role` document without authentication', (done) => {
      chai.request(server)
        .put('/api/documents/2')
        .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
    it('should return `you are not signed in` in attempt to `update` a `private` document without authentication', (done) => {
      chai.request(server)
        .put('/api/documents/3')
        .send({ title: 'My awesome title', body: 'my wonderful document content', ownerID: 1, access: 'public' })
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
    it('should return `you are not signed in` in attempt to `delete` a `public` document without authentication', (done) => {
      chai.request(server)
        .delete('/api/documents/1')
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
    it('should return `you are not signed in` in attempt to `delete` a `role` document without authentication', (done) => {
      chai.request(server)
        .delete('/api/documents/2')
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
    it('should return `you are not signed in` in attempt to `delete` a `private` document without authentication', (done) => {
      chai.request(server)
        .delete('/api/documents/3')
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('you are not signed in');
          done();
        });
    });
  });
});

