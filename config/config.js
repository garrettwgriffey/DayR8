// This config object is given to the models/index.js where we explicitly state on the end of `index.js line 6` if we are running either development, test, or production conditions from this file. We will have to set that line to production when we ship the final product, and change back to development when we work on it locally.

require('dotenv').config()
module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "dayr8",
    host: "localhost",
    port: 3306,
    dialect: "mysql"
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.JAWS_USERNAME,
    password: process.env.JAWS_PASSWORD,
    database: process.env.JAWS_DATABASE,
    host: process.env.JAWS_HOST,
    port: process.env.JAWS_PORT,
    dialect: process.env.JAWS_DIALECT
  }
}