const db = require('../models')

const seeds = [
  {
    title: "Today",
    emotion: "Happy",
    notes: "I felt up because this brightened my day"
  }
]
for (let i = 0; i < seeds.length; i++) {
  db.Feelings.create(seeds[i])
  .then((feeling) => {console.log(feeling)})
  .catch((err) => {})
}


