const db = require("../models");
const moment = require("moment");
var Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {
    getWeek: function (req, res) {
        let username = req.params.user.slice(1)
        var startOfWeek = moment().subtract(7,'d').toDate()
        var currentDate = moment().toDate()
        db.Feelings.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfWeek, currentDate]
                },
                user: username,
            },
            order: [ ['createdAt', 'DESC']]
        })
        .then((data) => {res.json(data)})
        .catch((err) => res.status(400).json(err));
    },
    getMonth: function (req, res) {
        let username = req.params.user.slice(1)
        var startOfMonth = moment().subtract(30,'d').toDate()
        var currentDate = moment().toDate()
        db.Feelings.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, currentDate]
                },
                user: username,
            },
            order: [ ['createdAt', 'DESC']]
        })
        .then((data) => {res.json(data)})
        .catch((err) => {res.status(400).json(err)})   
    },
    getYear: function (req, res) {
        let username = req.params.user.slice(1)
        var startOfYear = moment().subtract(365,'d').toDate()
        var currentDate = moment().toDate()
        db.Feelings.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfYear, currentDate]
                },
                user: username,
            },
            order: [ ['createdAt', 'DESC']]
        })
        .then((data) => {res.json(data)})
        .catch((err) => {res.status(400).json(err)})   
    }
}