import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';

chai.should();
chai.use(chaiHttp);


describe('The Search API', () => {
  // beforeEach((done) => {
  //   setTimeout(() => {
  //     done();
  //   }, 2000);
  // });

  describe('for Unauthenticated users', () => {
    describe('searching for a user', () => {
      it('should not return `not signed in` for unauthenticated users', (done) => {
        chai.request(server)
          .get('/api/search/users/?q=ajudensi')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.message.should.eql('you are not signed in');
            done();
          });
      });
    });

    describe('searching for a document', () => {
      it('should return public documents for unauthenticated users', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=a very random title')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.count.should.be.gte(1);
            res.body.rows.should.be.an('array');
            done();
          });
      });

      it('should return `0 count` searching for a private document by unauthenticated user', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=zero')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.count.should.eql(0);
            done();
          });
      });

      it('should return `0 count` searching for a role document by unauthenticated user', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=cheese')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.count.should.eql(0);
            done();
          });
      });
    });
  });

  describe('for Authenticated users', () => {
    let authenticatedUser;
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
    describe('searching for a user', () => {
      it('should return `actual user` for authenticated users', (done) => {
        chai.request(server)
          .get('/api/search/users/?q=ajudensi')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.rows.should.be.instanceof(Array);
            res.body.rows[0].username.should.eql('ajudensi');
            done();
          });
      });
    });

    describe('searching for a document', () => {
      it('should not return `bad request` for authenticated users', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=cheese')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .end((err, res) => {
            res.should.not.have.status(401);
            res.body.should.be.an('object');
            done();
          });
      });

      it('should not return priviledged documents for authenticated users', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=cheese')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .end((err, res) => {
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
