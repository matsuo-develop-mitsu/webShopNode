const mysql = require("mysql2");
const { dbConfig } = require("../dbConfig");
const userTable = "User";
const userDataIndex = 0;

module.exports = {
  getLoginUser: async function (email, password) {
    let result;
    const connection = mysql.createConnection(dbConfig);
    await connection
      .promise()
      .query(`SELECT * FROM ${userTable} WHERE mail = ? and password = ?`, [
        email,
        password,
      ])
      .then((data) => {
        if (data) {
          result = data[userDataIndex];
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        if (connection) {
          connection.end();
        }
      });
    return result;
  },
};
