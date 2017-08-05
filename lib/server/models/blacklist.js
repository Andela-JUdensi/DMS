'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Blacklists = sequelize.define('Blacklists', {
    authorizationToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return Blacklists;
};