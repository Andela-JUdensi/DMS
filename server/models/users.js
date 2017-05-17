import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Documents.hasMany(models.Documents, {
          foreignKey: 'ownerID',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      validatePassword(userpassword) {
        return bcrypt.compareSync(userpassword, this.password);
      }
    },
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        return user.password;
      },
      beforeUpdate: (user) => {
        if (user._changed.password) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
      }
    }
  });
  return Documents;
};
