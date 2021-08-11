const mysql = require("mysql2");
const { dbConfig } = require("../dbConfig");
const itemTable = "Items";
const itemDataIndex = 0;

module.exports = {
  getAllItems: async function () {
    let result;
    const connection = mysql.createConnection(dbConfig);
    await connection
      .promise()
      .query(`SELECT * FROM ${itemTable}`)
      .then((data) => {
        result = [];
        data[itemDataIndex].forEach((item) => {
          result.push(item);
        });
      })
      .catch((error) => {
        console.log(error.message);
        result = false;
      })
      .finally(() => {
        if (connection) {
          // DB接続を終了させる
          connection.end();
        }
      });
    return result;
  },
  getItemDetail: async function (itemId) {
    let result;
    const connection = mysql.createConnection(dbConfig);
    await connection
      .promise()
      .query(
        `SELECT id, name, imageName, price, detail FROM ${itemTable} WHERE id = ?`,
        [itemId]
      )
      .then((data) => {
        result = [];
        result = data[itemDataIndex][itemDataIndex];
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
