import chai from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import server from '../../../server';

chai.should();
chai.use(chaiHttp);

describe('Role API', () => {
  // beforeEach((done) => {
  //   setTimeout(() => {
  //     done();
  //   }, 2000);
  // });

  it('should not create role if user is not signed in', (done) => {
    chai.request(server)
      .post('/api/roles/')
      .send({
        roleName: 'random role',
        describe: 'description for a random role'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.message.should.eql('you are not signed in');
        done();
      });
  });

  describe('GET Role', () => {
    it('should not GET all the roles if not authorized', (done) => {
      chai.request(server)
        .get('/api/roles/')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.an('object');
          res.body.message.should.eql('you are not signed in');
          done();
        });
    });

    it('should not GET roles no token provided', (done) => {
      chai.request(server)
        .get('/api/roles/1')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.message.should.eql('you are not signed in');
          done();
        });
    });

    it('should not GET roles if the token provided is invalid', (done) => {
      chai.request(server)
        .get('/api/roles/')
        .set('authorization', 'bearer abcdefghijklmnop1234567890')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.message.should.eql('you are not signed in');
          done();
        });
    });
  });

  describe('get roles route if user is authenticated', () => {
    let authenticatedUser;
    it('should login an existing user', (done) => {
      chai.request(server)
        .post('/api/users/login/')
        .send({
          identifier: 'ajudensi',
          password: 'password123',
        })
        .end((err, res) => {
          authenticatedUser = res.body;
          res.should.have.status(200);
          done();
        });
    });

    it('should GET roles', (done) => {
      chai.request(server)
        .get('/api/roles/')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        
        
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should GET roles by roleId', (done) => {
      chai.request(server)
        .get('/api/roles/1')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        
        
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });

    it('should not GET un-existent roles by roleId', (done) => {
      chai.request(server)
      .get('/api/roles/1000')
      .set('authorization', `bearer ${authenticatedUser.token}`)
      
      
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });

    it('should create new role if admin', (done) => {
      chai.request(server)
        .post('/api/roles/')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        
        
        .send({
          roleName: faker.commerce.department(),
          description: faker.lorem.sentence(),
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('should return error if roleId is invalid in a get request', (done) => {
      chai.request(server)
        .get('/api/roles/50')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        
        
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should delete any role if admin', (done) => {
      chai.request(server)
        .delete('/api/roles/4')
        .set('authorization', `bearer ${authenticatedUser.token}`)
        
        
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
