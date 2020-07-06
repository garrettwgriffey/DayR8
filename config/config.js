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
    // "use_env_variable": "JAWSDB_URL",
    // "dialect": "mysql"

    username: process.env.JAWS_USERNAME,
    password: process.env.JAWS_PASSWORD,
    database: process.env.JAWS_DATABASE,
    host: process.env.JAWS_HOST,
    port: process.env.JAWS_PORT,
    dialect: process.env.JAWS_DIALECT
  }
}