export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
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
