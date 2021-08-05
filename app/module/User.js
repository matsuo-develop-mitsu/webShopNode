const mysql = require("mysql2");
const dbConfig = require("../dbConfig");
const userTable = "User";
const userDataIndex = 0;

module.exports = {
  getLoginUser: async function () {
    let result = null;
    const connection = mysql.createConnection(dbConfig);
    return connection.promise().query(`SELECT * FROM ${userTable}`);
  },
};
