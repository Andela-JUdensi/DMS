import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already exist. choose another or login',
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'first name should contain only alphabets'
        },
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'last name should contain only alphabets'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already exist. choose another or login',
        fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'the email you entered is not valid',
        },
        max: {
          args: 254,
          msg: 'the email you entered is invalid or longer than 254 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7],
          msg: 'the password you entered is less than 7 characters'
        },
      }
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
  }, {
    classMethods: {
      associate(models) {
        Documents.hasMany(models.Documents, {
          foreignKey: 'ownerID',
          onDelete: 'SET NULL'
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
