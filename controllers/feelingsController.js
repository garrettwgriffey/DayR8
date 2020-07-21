const db = require("../models");
const moment = require("moment");
var Sequelize = require('sequelize')
const Op = Sequelize.Op;

// Defining methods for the Feelings Controller
module.exports = {
  findAll: function (req, res) {
    db.Feelings.findAll(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Feelings.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(req);
    db.Feelings.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Feelings.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Feelings.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getBySpecificMonth: function (req, res) {
    console.log(req.body)
    var username = req.session.passport.user.username
    var startOfMonth = moment().startOf(req.body)
    var endOfMonth = moment().endOf(req.body)
    db.Feelings.findAll({
      where: {
          createdAt: {
              [Op.between]: [startOfMonth, endOfMonth]
          },
          user: username
      }
  })
  .then((data) => {res.json(data)})
  }
};
