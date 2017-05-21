import chai from 'chai';
import models from '../../../models/';
import { rolesTestSeed } from '../seeder';

const Roles = models.Roles;
chai.should();

describe('Model for Roles table', () => {
  describe('case of already existing role', () => {
    it('should return `unique violation error` if role name already exist`', (done) => {
      Roles.create(rolesTestSeed[0])
        .catch((errors) => {
          errors.errors[0].message.should.eql('a role with this name already exist. Choose another');
          errors.errors[0].type.should.eql('unique violation');
          errors.name.should.eql('SequelizeUniqueConstraintError');
          done();
        });
    });
  });

  describe('case of valid Roles.', () => {
    afterEach((done) => {
      Roles.destroy({
        where: {
          roleName: rolesTestSeed[1].roleName
        }
      }).then(success => done());
    });

    it('should create role if it is valid', (done) => {
      Roles.create(rolesTestSeed[1])
        .then((success) => {
          success.dataValues.roleName.should.eql('guest');
          success.dataValues.description.should.eql('an unregistered user');
          done();
        });
    });
  });
});
