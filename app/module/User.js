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
        if (data[userDataIndex].length) {
          result = data[userDataIndex];
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        // DB接続を終了させる
        if (connection) {
          connection.end();
        }
      });
    return result[userDataIndex];
  },
  registUser: async function (name, email, password) {
    let result = false;
    const connection = mysql.createConnection(dbConfig);

    if ([name, email, password].indexOf(null) !== -1) {
      return result;
    }
    await connection
      .promise()
      .query(
        `INSERT INTO ${userTable}(name, mail, password) VALUES (?, ?, ?)`,
        [name, email, password]
      )
      .then((data) => {
        result = true;
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        // DB接続を終了させる
        if (connection) {
          connection.end();
        }
      });
    return result;
  },
};
