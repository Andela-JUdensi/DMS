'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var Documents = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already exist. choose another or login'
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'first name should contain only alphabets'
        }
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
          msg: 'the email you entered is not valid'
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
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Documents.hasMany(models.Documents, {
          foreignKey: 'ownerID',
          onDelete: 'SET NULL'
        });
      }
    },
    instanceMethods: {
      validatePassword: function validatePassword(userpassword) {
        return _bcrypt2.default.compareSync(userpassword, this.password);
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        user.password = _bcrypt2.default.hashSync(user.password, _bcrypt2.default.genSaltSync(10));
        return user.password;
      },
      beforeUpdate: function beforeUpdate(user) {
        if (user._changed.password) {
          user.password = _bcrypt2.default.hashSync(user.password, _bcrypt2.default.genSaltSync(10));
        }
      }
    }
  });
  return Documents;
};