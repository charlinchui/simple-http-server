const mysql = require("mysql2");
//DB Connection
const con = mysql.createPool({
  host: "localhost" || process.env.DB_HOST,
  user: "root" || process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = con;
