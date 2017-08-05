import chai from 'chai';
import models from '../../../models/';
import { documentsTestSeed } from '../seeder';

const Documents = models.Documents;
chai.should();

describe('Model for Documents table', () => {
  describe('case of already existing document', () => {
    it('should return `unique violation error` if title already exist`', (done) => {
      Documents.create(documentsTestSeed[0])
        .catch((errors) => {
          errors.message.should.eql('a document with this title already exist. Choose another');
          errors.errors[0].type.should.eql('unique violation');
          errors.name.should.eql('SequelizeUniqueConstraintError');
          done();
        });
    });
  });

  describe('case of invalid documents', () => {
    it('should return `SequelizeValidationError` if title length is lower than 5 characters`', (done) => {
      Documents.create(documentsTestSeed[1])
        .catch((errors) => {
          errors.message.should.eql('Validation error: document title must be between 5 and 100 characters');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` if title or body is empty', (done) => {
      Documents.create(documentsTestSeed[2])
        .catch((errors) => {
          errors.message.should.eql('Validation error: document title must be between 5 and 100 characters');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` if access name is invalid', (done) => {
      Documents.create(documentsTestSeed[3])
        .catch((errors) => {
          errors.errors[0].message.should.eql('the specified access name is not available. Choose from [public, private, role]');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeForeignKeyConstraintError` error if user does not exist', (done) => {
      Documents.create(documentsTestSeed[4])
        .catch((errors) => {
          errors.name.should.eql('SequelizeForeignKeyConstraintError');
          done();
        });
    });
  });

  describe('case of valid documents', () => {
    afterEach((done) => {
      Documents.destroy({
        where: {
          title: documentsTestSeed[5].title
        }
      }).then(() => done());
    });

    it('should create document if it is valid', (done) => {
      Documents.create(documentsTestSeed[5])
        .then((success) => {
          success.dataValues.title.should.eql('Mastery');
          success.dataValues.access.should.eql('public');
          done();
        });
    });
  });
});
