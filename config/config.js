require('dotenv').config()
module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    dialect: process.env.dialect
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