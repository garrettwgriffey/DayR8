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
  