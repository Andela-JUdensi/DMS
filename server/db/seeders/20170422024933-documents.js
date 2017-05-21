const faker = require('faker');

module.exports = {
  up(queryInterface, Sequelize) {
    const arr = [];
    for (let index = 0; index < 50; index += 1) {
      arr.push(index);
    }

    const access = {
      1: 'public',
      2: 'private',
      3: 'role',
    };

    const documents = [...[{
      title: 'how to read a book',
      body: 'learn how to read a book by motimer adler',
      ownerID: 1,
      access: 'public',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'who moved my cheese',
      body: 'can not even remember the author of this one',
      ownerID: 2,
      access: 'role',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'a place called zero',
      body: 'definitely written by shaffin de zane',
      ownerID: 3,
      access: 'private',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'the naked apes',
      body: 'by desmond elliot. My loved book in evolutionary behavior',
      ownerID: 1,
      access: 'private',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'the bounds of reason',
      body: 'behavioral economics by herbert gintis, a classic',
      ownerID: 3,
      access: 'role',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], ...arr.map(() => ({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(60),
      access: access[Math.round(Math.random() * 2) + 1],
      ownerID: Math.floor(Math.random() * 19) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))];

    return queryInterface.bulkInsert('Documents', documents, {
      returning: true,
      validate: true,
    });
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
