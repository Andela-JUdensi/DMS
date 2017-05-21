import chai from 'chai';
import models from '../../../models/';
import { usersTestSeed } from '../seeder';

const Users = models.Users;
chai.should();

describe('Model for Users table', () => {
  describe('case of already existing user', () => {
    it('should return `unique violation error` if username already exist`', (done) => {
      Users.create(usersTestSeed[0])
        .catch((errors) => {
          // errors.message.should.eql('username already exist. choose another or login');
          errors.errors[0].type.should.eql('unique violation');
          errors.name.should.eql('SequelizeUniqueConstraintError');
          done();
        });
    });
    it('should return `unique violation error` if email already exist`', (done) => {
      Users.create(usersTestSeed[1])
        .catch((errors) => {
          errors.message.should.eql('email already exist. choose another or login');
          errors.errors[0].type.should.eql('unique violation');
          errors.name.should.eql('SequelizeUniqueConstraintError');
          done();
        });
    });
  });

  describe('case of invalid user', () => {
    it('should return `SequelizeValidationError` if firstname is NULL`', (done) => {
      Users.create(usersTestSeed[2])
        .catch((errors) => {
          errors.message.should.eql('Validation error: first name should contain only alphabets');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` if firstname is not alphabet`', (done) => {
      Users.create(usersTestSeed[3])
        .catch((errors) => {
          errors.message.should.eql('Validation error: first name should contain only alphabets');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` if lastname is NULL`', (done) => {
      Users.create(usersTestSeed[4])
        .catch((errors) => {
          errors.message.should.eql('Validation error: last name should contain only alphabets');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` if lastname is not alphabet`', (done) => {
      Users.create(usersTestSeed[5])
        .catch((errors) => {
          errors.message.should.eql('Validation error: last name should contain only alphabets');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` for invalid email', (done) => {
      Users.create(usersTestSeed[6])
        .catch((errors) => {
          errors.message.should.eql('Validation error: the email you entered is not valid');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeValidationError` if password < 7 characters', (done) => {
      Users.create(usersTestSeed[7])
        .catch((errors) => {
          errors.message.should.eql('Validation error: the password you entered is less than 7 characters');
          errors.errors[0].type.should.eql('Validation error');
          errors.name.should.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `SequelizeForeignKeyConstraintError` error if user role does not exist', (done) => {
      Users.create(usersTestSeed[8])
        .catch((errors) => {
          errors.name.should.eql('SequelizeForeignKeyConstraintError');
          done();
        });
    });
  });
  describe('case of valid user', () => {
    afterEach((done) => {
      Users.destroy({
        where: {
          username: usersTestSeed[9].username
        }
      }).then(success => done());
    });

    it('should create user if credentials are valid', (done) => {
      Users.create(usersTestSeed[9])
        .then((success) => {
          success.dataValues.username.should.eql('irishpotato');
          success.dataValues.email.should.eql('irish@potato.com');
          done();
        });
    });
  });
});
