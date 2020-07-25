require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.PASSWORD,
    // password: "root",
    database: "dayr8",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    host: process.env.JAWSHOST,
    username: process.env.JAWSUSERNAME,
    password: process.env.JAWSPASSWORD,
    port: 3306,
    database: process.env.JAWSDATABASE,
      dialect: "mysql",
  },
};
