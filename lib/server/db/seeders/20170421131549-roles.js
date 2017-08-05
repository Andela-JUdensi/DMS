'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [{
      roleName: 'superadmin',
      description: 'super admin has all privileges. Creates admin as well',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      roleName: 'admin',
      description: 'admin has all privilege except creating another admin or a super admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      roleName: 'regular',
      description: 'regular users only have access to owned, public documents, role-based documents',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, { returning: true });
  }
};