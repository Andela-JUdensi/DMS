import chai from 'chai';
import models from '../../../models/';

const Blacklists = models.Blacklists;
const authToken = 'abcdefghiklmnopqrtuvwxyz1234567890';
chai.should();

describe('Model for Blacklists table', () => {
  after((done) => {
    Blacklists.destroy({
      where: {
        authorizationToken: authToken,
      }
    }).then(success => done());
  });
  describe('case of valid Token.', () => {
    it('should save a token', (done) => {
      Blacklists.create({
        authorizationToken: authToken,
      })
        .then((success) => {
          success.dataValues.authorizationToken.should.eql(authToken);
          done();
        });
    });
  });
  describe('case of already existing token', () => {
    it('should return success', (done) => {
      Blacklists.create({
        authorizationToken: authToken,
      })
        .then((success) => {
          success.dataValues.authorizationToken.should.eql(authToken);
          done();
        });
    });
  });
});
