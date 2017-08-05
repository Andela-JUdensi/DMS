'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [10, 150],
            msg: 'Document title must be between 10 and 150 characters'
          }
        }
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      access: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'public',
        validate: {
          isIn: [['public', 'private', 'role']]
        }
      },
      ownerID: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Documents');
  }
};