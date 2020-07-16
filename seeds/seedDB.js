// const mysql = require("mysql");
const db = require("../models");

const seeds = [
  {
    title: "Today",
    emotion: 8,
    notes: "I felt up because this brightened my day",
    user: "tim@gmail.com",
    createdAt: "2020-07-15 00:19:19",
  },
  {
    title: "New Note",
    emotion: 6,
    notes: "Some new text for a new note",
    user: "someoneElse",
    createdAt: "2020-07-01 00:19:19",
  },
  {
    title: "New",
    emotion: 8,
    notes: "Another new note",
    user: "tim@gmail.com",
    createdAt: "2020-06-15 00:19:19",
  },
  {
    title: "From Last Year",
    emotion: 2,
    notes: "I felt up because this brightened my day",
    user: "tim@gmail.com",
    createdAt: "2019-07-15 00:19:19",
  },
  {
    title: "From Last Month",
    emotion: 5,
    notes: "I felt up because this brightened my day",
    user: "wat",
    createdAt: "2020-06-24 00:19:19",
  },
  {
    title: "Yesterday",
    emotion: 8,
    notes: "I felt up because this brightened my day",
    user: "tim@gmail.com",
    createdAt: "2020-07-14 00:19:19",
  },
  {
    title: "A Couple Days Ago",
    emotion: 8,
    notes: "I felt up because this brightened my day",
    user: "tim@gmail.com",
    createdAt: "2020-07-13 00:19:19",
  },
  {
    title: "Few Days Ago",
    emotion: 8,
    notes: "I felt up because this brightened my day",
    user: "tim@gmail.com",
    createdAt: "2020-07-12 00:19:19",
  },
  {
    title: "January",
    emotion: 8,
    notes: "From January 15",
    user: "tim@gmail.com",
    createdAt: "2020-01-15 00:19:19",
  },
];

const userSeed = {username: "tim@gmail.com", password: "password"}

db.User.create(userSeed).then((res) => console.log(res))

for (let i = 0; i < seeds.length; i++) {
  db.Feelings.create(seeds[i])
    .then((feeling) => {
      console.log(feeling);
    })
    .catch((err) => {});
}

// var connection = mysql.createConnection(
//   process.env.NODE_ENV === "production" ? process.env.JAWSDB_URL :
// {
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: "password",
//     database: "dayr8"
//   });

//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     connection.query("INSERT INTO feelings (`title`, `emotion`, `notes`) VALUES ('Today', 'happy', 'I felt up because this brightened my day') , ('Yesterday', 'anxious', 'My anxiety was triggered by Karens actions')" ,
//       (err, results) => {
//       if (err) throw (err);
//       console.log(results)
//         connection.end();
//      }
// )});
