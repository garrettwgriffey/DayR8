const Sequelize = require("sequelize");


// Sequelize DataTypes in Database Table "Feelings"
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
    },
  });
  return Feelings;
};
