const mysql = require("mysql2");

const connection=mysql.createPool({
  host: "127.0.0.1",
  user: "mohamed",
  password: "8282",
  database: "biobeo_v5",
}).promise()


module.exports = connection;
