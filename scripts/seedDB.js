const db = require('../models');

// Seeds for each column in the Feelings Table
const seeds = [
  {
    title: "Today",
    emotion: "Happy",
    notes: "I felt up because this brightened my day"
  },
  {
    title: "This afternoon",
    emotion: "Anxious",
    notes: "I'm very annoyed by Karen's actions. She drives me crazy!"
  },
  {
    title: "July 5th",
    emotion: "Frustrated",
    notes: "React does not React like I want it to!"
  }
]
for (let i = 0; i < seeds.length; i++) {
  db.Feelings.create(seeds[i])
  .then((feeling) => {console.log(feeling)})
  .catch((err) => {})
}


