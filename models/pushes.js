// Feel free to rewrite and rename this entire table. It was a test for db setup. This just gives a general idea of the table creation template - Tim M.

module.exports = function (sequelize, DataTypes) {
    var Pushes = sequelize.define('Pushes', {
      authorization: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    return Pushes
  }
  