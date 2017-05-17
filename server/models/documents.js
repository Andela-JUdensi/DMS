export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5, 150],
          msg: 'Document title must be between 10 and 150 characters',
        },
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: [['public', 'private', 'role']],
      },
    },
    ownerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Documents;
};
