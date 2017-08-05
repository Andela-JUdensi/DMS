'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models/');

var _models2 = _interopRequireDefault(_models);

var _seeder = require('../seeder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Documents = _models2.default.Documents;
_chai2.default.should();

describe('Model for Documents table', function () {
  describe('case of already existing document', function () {
    it('should return `unique violation error` if title already exist`', function (done) {
      Documents.create(_seeder.documentsTestSeed[0]).catch(function (errors) {
        errors.message.should.eql('a document with this title already exist. Choose another');
        errors.errors[0].type.should.eql('unique violation');
        errors.name.should.eql('SequelizeUniqueConstraintError');
        done();
      });
    });
  });

  describe('case of invalid documents', function () {
    it('should return `SequelizeValidationError` if title length is lower than 5 characters`', function (done) {
      Documents.create(_seeder.documentsTestSeed[1]).catch(function (errors) {
        errors.message.should.eql('Validation error: document title must be between 5 and 100 characters');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` if title or body is empty', function (done) {
      Documents.create(_seeder.documentsTestSeed[2]).catch(function (errors) {
        errors.message.should.eql('Validation error: document title must be between 5 and 100 characters');
        errors.errors[0].type.should.eql('Validation error');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeValidationError` if access name is invalid', function (done) {
      Documents.create(_seeder.documentsTestSeed[3]).catch(function (errors) {
        errors.errors[0].message.should.eql('the specified access name is not available. Choose from [public, private, role]');
        errors.name.should.eql('SequelizeValidationError');
        done();
      });
    });
    it('should return `SequelizeForeignKeyConstraintError` error if user does not exist', function (done) {
      Documents.create(_seeder.documentsTestSeed[4]).catch(function (errors) {
        errors.name.should.eql('SequelizeForeignKeyConstraintError');
        done();
      });
    });
  });

  describe('case of valid documents', function () {
    afterEach(function (done) {
      Documents.destroy({
        where: {
          title: _seeder.documentsTestSeed[5].title
        }
      }).then(function () {
        return done();
      });
    });

    it('should create document if it is valid', function (done) {
      Documents.create(_seeder.documentsTestSeed[5]).then(function (success) {
        success.dataValues.title.should.eql('Mastery');
        success.dataValues.access.should.eql('public');
        done();
      });
    });
  });
});