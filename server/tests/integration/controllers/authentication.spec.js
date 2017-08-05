import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';


const should = chai.should();
chai.use(chaiHttp);

describe('The user authentication API', () => {
  // beforeEach((done) => {
  //   setTimeout(() => {
  //     done();
  //   }, 2000);
  // });

  let authenticatedUser;
  describe('the login route', () => {
    describe('for valid users', () => {
      it('should login an existing user with valid username and password', (done) => {
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
      it('should login an existing user with valid email and password', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'ajudensi@breed101.com',
            password: 'password123',
          })
          .end((err, res) => {
            authenticatedUser = res.body;
            res.should.have.status(200);
            res.body.status.should.eql('true');
            jwt.decode(res.body.token).roleId.should.eql(2);
            done();
          });
      });
      it('should generate an access token for a valid user', (done) => {
        should.exist(authenticatedUser.token);
        done();
      });
      it('should return `404` if user does not exist', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'idont@exist.com',
            password: 'password123',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.message.should.eql('You don\'t exist');
            done();
          });
      });
      it('should return `bad request` for bad credentials', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'idont@exist.com',
            password: 'password123',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.message.should.eql('You don\'t exist');
            done();
          });
      });
    });

    describe('the logout route', () => {
      it('should log a user out', (done) => {
        chai.request(server)
          .post('/api/users/logout/')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.eql('logout successful');
            done();
          });
      });
      it('should prevent a user from authenticated actions', (done) => {
        chai.request(server)
          .get('/api/search/users/')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.message.should.eql('you are not signed in');
            done();
          });
      });
    });

    describe('for invalid users', () => {
      it('should invalidate wrong credentials', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'somefaker@dude.com',
            password: 'whateverpassword',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.message.should.eql('You don\'t exist');
            done();
          });
      });
      it('should invalidate users with wrong password', (done) => {
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
      it('should invalidate users without a token', (done) => {
        chai.request(server)
        .get('/api/search/users/')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });
      it('should invalidate users with a wrong token', (done) => {
        chai.request(server)
        .get('/api/users/')
        .set('authorization', 'bearer 1234567890abcdefgh')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql('you are not signed in');
          done();
        });
      });
      it('should invalidate users with no password or identfier', (done) => {
        chai.request(server)
          .post('/api/users/login/')
          .send({
            identifier: 'SiliconValley',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('username and password are required');
            done();
          });
      });
    });
  });
});

