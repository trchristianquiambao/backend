const mysql = require("mysql2");

let dbConnection;

exports.init = function (callback) {
  dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  dbConnection.connect((err) => {
    if (err) {
      console.error("MySQL Connection Failed: ", err);
      return;
    }
    console.log("✅ MySQL Connected Successfully!");
    callback(dbConnection);
  });
};

exports.getDbConnection = function () {
  return dbConnection;
};
