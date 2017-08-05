'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Blacklists = _models2.default.Blacklists;
var authToken = 'abcdefghiklmnopqrtuvwxyz1234567890';
_chai2.default.should();

describe('Model for Blacklists table', function () {
  after(function (done) {
    Blacklists.destroy({
      where: {
        authorizationToken: authToken
      }
    }).then(function () {
      return done();
    });
  });
  describe('case of valid Token.', function () {
    it('should save a token', function (done) {
      Blacklists.create({
        authorizationToken: authToken
      }).then(function (success) {
        success.dataValues.authorizationToken.should.eql(authToken);
        done();
      });
    });
  });
  describe('case of already existing token', function () {
    it('should return success', function (done) {
      Blacklists.create({
        authorizationToken: authToken
      }).then(function (success) {
        success.dataValues.authorizationToken.should.eql(authToken);
        done();
      });
    });
  });
});