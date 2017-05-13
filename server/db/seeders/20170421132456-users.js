const Faker = require('Faker');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

module.exports = {
  up(queryInterface, Sequelize) {
    const arr = [];
    for (let index = 4; index < 20; index += 1) {
      arr.push(index);
    }
    const users = [...arr.map(num => ({
      username: Faker.Internet.userName(),
      firstname: Faker.Name.lastName(),
      lastname: Faker.Name.firstName(),
      email: Faker.Internet.email(),
      password: bcrypt.hashSync('password123', salt),
      roleID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), ...[{
      username: 'SiliconValley',
      firstname: 'Chidi',
      lastname: 'Udensi',
      email: 'ajudensi@breed101.com',
      password: bcrypt.hashSync('password123', salt),
      roleID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: Faker.Internet.userName(),
      firstname: Faker.Name.firstName(),
      lastname: Faker.Name.lastName(),
      email: Faker.Internet.email(),
      password: bcrypt.hashSync('password123', salt),
      roleID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'ajudensi',
      firstname: 'Joshua',
      lastname: 'Udensi',
      email: 'joshua.udensi@andela.com',
      password: bcrypt.hashSync('password123', salt),
      roleID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]];
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
