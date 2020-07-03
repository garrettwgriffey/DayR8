// Feel free to rewrite and rename this entire table. It was a test for db setup. This just gives a general idea of the table creation template - Tim M.

module.exports = function (sequelize, DataTypes) {
    var Comments = sequelize.define('Comments', {
      resID: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    })
    return Comments
  }
  