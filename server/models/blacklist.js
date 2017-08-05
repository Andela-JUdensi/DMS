export default (sequelize, DataTypes) => {
  const Blacklists = sequelize.define('Blacklists', {
    authorizationToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
  return Blacklists;
};
