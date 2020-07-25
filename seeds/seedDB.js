// const mysql = require("mysql");
const db = require("../models");
const moment = require('moment');

const userSeed = {username: "tim@gmail.com", password: "password"}

db.User.create(userSeed).then((res) => console.log(res))

// Two years of fake random data
for (let i = 0; i < 730; i++) {
  let randomNumber = Math.floor(Math.random() * (9 - 1)) + 1;
  let countdownDays = moment().subtract(i, 'd').toDate()
  db.Feelings.create(  {
    title: "A title",
    emotion: randomNumber,
    notes: "Some text",
    user: "tim@gmail.com",
    createdAt: countdownDays
  })
    .then((feeling) => {
      console.log(feeling);
    })
    .catch((err) => {console.log(err)});
}
