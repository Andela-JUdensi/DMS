import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';

chai.should();
chai.use(chaiHttp);


describe('The Search API', () => {
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
      it('should not return `not signed in` for unauthenticated users', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=a very random title')
          .end((err, res) => {
            res.should.not.have.status(200);
            res.body.should.be.an('object');
            res.body.message.should.eql('no match found for a very random title');
            done();
          });
      });
    });
  });

  describe('for Authenticated users', () => {
    let authenticatedUser;
    before((done) => {
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
          .set('x-userid', authenticatedUser.user.id)
          .set('x-roleid', authenticatedUser.user.roleID)
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
          .set('x-userid', authenticatedUser.user.id)
          .set('x-roleid', authenticatedUser.user.roleID)
          .end((err, res) => {
            res.should.not.have.status(401);
            res.body.should.be.an('object');
            done();
          });
      });
    });
  });
});
