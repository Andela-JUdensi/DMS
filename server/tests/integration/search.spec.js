import chai from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import server from '../../server';
import models from '../../models';
import { searchCtrl } from '../../controllers';

const should = chai.should();
const RolesModels = models.Roles;
chai.use(chaiHttp);

describe('Search API', () => {
  describe('for Unauthenticated users', () => {
    describe('searching for a user', () => {
      it('should not return `not signed in` for unauthenticated users', function (done) {
        this.timeout(20000);
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
          .get('/api/search/documents/?q=sa')
          .end((err, res) => {
            res.should.not.have.status(200);
            res.body.should.be.an('object');
            res.body.message.should.eql('no match found for sa');
            done();
          });
      });
    });
  });

  describe('for authenticated users', () => {
    let authenticatedUser;
    before((done) => {
      chai.request(server)
        .post('/api/users/login/')
        .send({
          identifier: 'ajudensi',
          password: 'password123',
        })
        .end((err, res) => {
          authenticatedUser = res.body;
          done();
        });
    });
    // describe.only('sinon mocking', () => {
    //   const req = {};
    //   let res = {};
    //   beforeEach((done) => {
    //     res = {};
    //     res.status = sinon.spy();
    //     res.json = sinon.spy();
    //     done();
    //   });
    //   it('should return search result with pagination', (done) => {
    //   // const req = {};
    //   // const res = {
    //   //   data: sinon.spy(),
    //   // };
    //     req.query = { q: 'ajudensi' };
    //     searchCtrl.searchForAUser(req, res);
    //     console.log(res.status.returnValues);
    //     done();
    //   });
    // });
    describe('searching for a user', () => {
      it('should not return `bad request` for authenticated users', function (done) {
        this.timeout(20000);
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

    describe('searching for a user', () => {
      it('should not return `bad request` for authenticated users', (done) => {
        chai.request(server)
          .get('/api/search/documents/?q=quo')
          .set('authorization', `bearer ${authenticatedUser.token}`)
          .set('x-userid', authenticatedUser.user.id)
          .set('x-roleid', authenticatedUser.user.roleID)
          .end((err, res) => {
            res.should.not.have.status(401);
            res.body.should.be.an('object');
            res.body.message.should.eql('no match found for quo');
            done();
          });
      });
    });
  });
});
