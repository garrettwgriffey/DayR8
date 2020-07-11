const Sequelize = require("sequelize");

// Module for DataTypes for Feelings Table
module.exports = function (sequelize, DataTypes) {
  var Feelings = sequelize.define("Feelings", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emotion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return Feelings;
};
