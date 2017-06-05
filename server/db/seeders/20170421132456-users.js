const faker = require('faker');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

module.exports = {
  up(queryInterface, Sequelize) {
    const arr = [];
    for (let index = 4; index < 20; index += 1) {
      arr.push(index);
    }
    const users = [...[{
      username: 'SiliconValley',
      firstname: 'Chidi',
      lastname: 'Udensi',
      email: 'ajudensi@breed101.com',
      password: bcrypt.hashSync('password123', salt),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'thePiper',
      firstname: 'Peter',
      lastname: 'Piper',
      email: 'peter@piper.com',
      password: bcrypt.hashSync('password123', salt),
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'ajudensi',
      firstname: 'Joshua',
      lastname: 'Udensi',
      email: 'joshua.udensi@andela.com',
      password: bcrypt.hashSync('password123', salt),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], ...arr.map(num => ({
      username: faker.internet.userName(),
      firstname: faker.name.lastName(),
      lastname: faker.name.firstName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('password123', salt),
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))];
    return queryInterface.bulkInsert('Users', users, { returning: true, validate: true });
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
