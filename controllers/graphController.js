const db = require("../models");
const moment = require("moment");
var Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {
    getWeek: function (req, res) {
        var startOfWeek = moment().startOf('week').toDate()
        var endOfWeek = moment().endOf('week').toDate()
        console.log(startOfWeek)
        db.Feelings.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            }
        })
        .then((data) => {res.json(data)})
        .catch((err) => res.status(422).json(err));
    },
    getMonth: function (req, res) {
        var startOfMonth = moment().startOf('month').toDate()
        var endOfMonth = moment().endOf('month').toDate()
        db.Feelings.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        })
        .then((data) => {res.json(data)})
        .catch((err) => {res.status(400).json(err)})   
    },
    getYear: function (req, res) {
        var startOfYear = moment().startOf('year').toDate()
        var endOfYear = moment().endOf('year').toDate()
        db.Feelings.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfYear, endOfYear]
                }
            }
        })
        .then((data) => {res.json(data)})
        .catch((err) => {res.status(400).json(err)})   
    }
}