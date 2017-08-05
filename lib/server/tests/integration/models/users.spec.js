'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models/');

var _models2 = _interopRequireDefault(_models);

var _seeder = require('../seeder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = _models2.default.Users;
_chai2.default.should();

describe('Model for Users table', function () {
  describe('case of already existing user', function () {
    it('should return `unique violation error` if username already exist`', function (done) {
      Users.create(_seeder.usersTestSeed[0]).catch(function (errors) {
        errors.errors[0].type.should.eql('unique violation');
        errors.name.should.eql('SequelizeUniqueConstraintError');
        done();
      });
    });
    it('should return `unique violation error` if email already exist`', function (done) {
      Users.create(_seeder.usersTestSeed[1]).catch(function (errors) {
        errors.message.should.eql('email already exist. choose another or login');
        errors.errors[0].type.should.eql('unique violation');
        errors.name.should.eql('SequelizeUniqueConstraintError');
        done();
      });
    });
  });

  describe('case of invalid user', function () {
    it('should return `SequelizeValidationError` if firstname is NULL`', function (done) {
      Users.create(_seeder.usersTestSeed[2]).catch(function (errors) {
        errors.message.should.eql('Validation error: first name should contain only alphabets');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` if firstname is not alphabet`', function (done) {
      Users.create(_seeder.usersTestSeed[3]).catch(function (errors) {
        errors.message.should.eql('Validation error: first name should contain only alphabets');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` if lastname is NULL`', function (done) {
      Users.create(_seeder.usersTestSeed[4]).catch(function (errors) {
        errors.message.should.eql('Validation error: last name should contain only alphabets');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` if lastname is not alphabet`', function (done) {
      Users.create(_seeder.usersTestSeed[5]).catch(function (errors) {
        errors.message.should.eql('Validation error: last name should contain only alphabets');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` for invalid email', function (done) {
      Users.create(_seeder.usersTestSeed[6]).catch(function (errors) {
        errors.message.should.eql('Validation error: the email you entered is not valid');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` if password < 7 characters', function (done) {
      Users.create(_seeder.usersTestSeed[7]).catch(function (errors) {
        errors.message.should.eql('Validation error: the password you entered is less than 7 characters');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeForeignKeyConstraintError` error if user role does not exist', function (done) {
      Users.create(_seeder.usersTestSeed[8]).catch(function (errors) {
        errors.name.should.eql('SequelizeForeignKeyConstraintError');
        done();
      });
    });
  });
  describe('case of valid user', function () {
    afterEach(function (done) {
      Users.destroy({
        where: {
          username: _seeder.usersTestSeed[9].username
        }
      }).then(function () {
        return done();
      });
    });

    it('should create user if credentials are valid', function (done) {
      Users.create(_seeder.usersTestSeed[9]).then(function (success) {
        success.dataValues.username.should.eql('irishpotato');
        success.dataValues.email.should.eql('irish@potato.com');
        done();
      });
    });
  });
});