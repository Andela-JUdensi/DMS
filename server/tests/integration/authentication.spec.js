// import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
// import { userTestSeed, documentsTestSeed, rolesTestSeed } from './seeder';
// import models from '../../models';

// const assert = chai.assert;
// const UsersModel = models.Users;
// const DocumentsModel = models.Documents;
// const RolesModels = models.Roles;
// const spy = sinon.spy();

const should = chai.should();
chai.use(chaiHttp);

describe('User authentication API', () => {
  describe('User models', () => {
    describe('Login API', () => {
      let authenticatedUser;
      it('should login an existing user', (done) => {
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

      it('should have a token for logged in users', (done) => {
        should.exist(authenticatedUser.token);
        done();
      });


      it('should not authenthenticate fake users', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'somefaker@dude.com',
            password: 'whateverpassword',
          })
          .end((err, res) => {
            authenticatedUser = res.body;
            res.should.have.status(404);
            res.body.message.should.eql('You don\'t exist');
            done();
          });
      });

      it('should not authenthenticate users with wrong password', (done) => {
        chai.request(server)
        .post('/api/users/login/')
        .send({
          identifier: 'SiliconValley',
          password: 'trysomethingfake',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql('wrong login credentials');
          done();
        });
      });

      it('should not authenthenticate users without a token', (done) => {
        chai.request(server)
        .get('/api/users/')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });

      it('should not auth users with wrong username or email', (done) => {
        chai.request(server)
        .post('/api/users/login/')
        .send({
          identifier: 'jane doe',
          password: 'passsword',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('You don\'t exist');
          done();
        });
      });



      it('should not authenthenticate users with no password', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'SiliconValley',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Username and password are required');
            done();
          });
      });

      describe('Logout API', () => {
        it('should login an existing user', (done) => {
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

        it('should log a user out', (done) => {
          chai.request(server)
          .post('/api/users/logout/')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .set('x-userid', authenticatedUser.user.id)
          .set('x-roleid', authenticatedUser.user.roleID)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.eql('logout successful');
            done();
          });
        });
      });
    });
  });
});

