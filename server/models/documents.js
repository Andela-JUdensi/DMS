export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'a document with this title already exist. Choose another'
      },
      validate: {
        len: {
          args: [5, 100],
          msg: 'document title must be between 5 and 100 characters',
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
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'the specified access name is not available. Choose from [public, private, role]'
        }
      },
    },
    ownerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    classMethods: {
      associate(models) {
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerID',
          onDelete: 'SET NULL'
        });
      }
    }
  });
  return Documents;
};
