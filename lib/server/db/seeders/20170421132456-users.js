'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var faker = require('faker');
var bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10);

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var arr = [];
    for (var index = 4; index < 20; index += 1) {
      arr.push(index);
    }
    var users = [{
      username: 'SiliconValley',
      firstname: 'Chidi',
      lastname: 'Udensi',
      email: 'ajudensi@breed101.com',
      password: bcrypt.hashSync('password123', salt),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'thePiper',
      firstname: 'Peter',
      lastname: 'Piper',
      email: 'peter@piper.com',
      password: bcrypt.hashSync('password123', salt),
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'ajudensi',
      firstname: 'Joshua',
      lastname: 'Udensi',
      email: 'joshua.udensi@andela.com',
      password: bcrypt.hashSync('password123', salt),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }].concat(_toConsumableArray(arr.map(function (num) {
      return {
        username: faker.internet.userName(),
        firstname: faker.name.lastName(),
        lastname: faker.name.firstName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password123', salt),
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    })));
    return queryInterface.bulkInsert('Users', users, { returning: true, validate: true });
  },
  down: function down(queryInterface, Sequelize) {}
};