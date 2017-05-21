export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'a role with this name already exist. Choose another'
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    }
  }, {
    classMethods: {
      associate(models) {
        Roles.hasMany(models.Users, {
          foreignKey: 'roleID'
        });
      }
    }
  });
  return Roles;
};
