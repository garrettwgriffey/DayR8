require("dotenv").config();
module.exports = {
  development: {
    username: "root",
<<<<<<< HEAD
    password: process.env.password,
=======
    password: process.env.PW,
>>>>>>> c1178fd1daa4fe41df811ec286566fe487aa7209
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
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
  },
};
