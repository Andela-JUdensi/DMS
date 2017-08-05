'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models/');

var _models2 = _interopRequireDefault(_models);

var _seeder = require('../seeder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Roles = _models2.default.Roles;
_chai2.default.should();

describe('Model for Roles table', function () {
  describe('case of already existing role', function () {
    it('should return `unique violation error` if role name already exist`', function (done) {
      Roles.create(_seeder.rolesTestSeed[0]).catch(function (errors) {
        errors.errors[0].message.should.eql('a role with this name already exist. Choose another');
        errors.errors[0].type.should.eql('unique violation');
        errors.name.should.eql('SequelizeUniqueConstraintError');
        done();
      });
    });
  });

  describe('case of valid Roles.', function () {
    afterEach(function (done) {
      Roles.destroy({
        where: {
          roleName: _seeder.rolesTestSeed[1].roleName
        }
      }).then(function () {
        return done();
      });
    });

    it('should create role if it is valid', function (done) {
      Roles.create(_seeder.rolesTestSeed[1]).then(function (success) {
        success.dataValues.roleName.should.eql('guest');
        success.dataValues.description.should.eql('an unregistered user');
        done();
      });
    });
  });
});