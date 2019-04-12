let mysql = require('mysql');
let db = require('../configs/db');

let pool = mysql.createPool(db);

module.exports = {
    connectPool (sqlString, values, callback) {
        pool.getConnection((err, connection) => {
            connection.query(sqlString, values, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                callback(rows);
                connection.release();
            });
        });
    },

}