const db = require("../models");
const moment = require("moment");
var Sequelize = require('sequelize')
const Op = Sequelize.Op;

// Defining methods for the Feelings Controller
module.exports = {
  findAll: function (req, res) {
    let username = req.params.user.slice(1)
    db.Feelings.findAll({
      where: {
          user: username
      }
  })
      .then((notes) => res.json(notes))
      .catch((err) => res.status(422).json(err));
  },
  findLastEntry: function(req, res) {
    let username = req.params.user.slice(1)
    console.log(username)
    let startOfDay = moment().startOf('day')
    let endOfDay = moment(startOfDay).endOf('day')
    console.log(startOfDay, endOfDay)
    console.log(startOfDay, endOfDay)
    db.Feelings.findAll({
      limit: 1,
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        },
        user: username,
      },
    }).then((entry) => {res.json(entry); console.log(entry, "res")})
    .catch((err) => {res.status(422).json(err); console.log(err)})
  },
  // findById: function (req, res) {
  //   db.Feelings.findById(req.params.id)
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
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
    let month = req.params.month.slice(1)
    month = moment().month(month).format("M")
    let year = req.params.year.slice(1)
    let startDate = moment([year, month - 1]).format("YYYY-MM-01")
    let pseudoStartDate = moment([year, month - 2]).format("YYYY-MM-") + moment([year, month - 2]).endOf('month').format("DD")
    let endDate = moment(startDate).endOf('month').format("YYYY-MM-DD")
    let username = req.params.user.slice(1)
    console.log(startDate, endDate)
    db.Feelings.findAll({
      where: {
          createdAt: {
              [Op.between]: [pseudoStartDate, endDate]
          },
          user: username
      }
  })
  .then((data) => {console.log(data);res.json(data)})
  }
};
