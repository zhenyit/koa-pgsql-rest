var express = require('express');
var mysql = require('mysql');

let router = require('./routes/router');
let db = require('./configs/db');
let sql = require('./sql/sqlMap');

var app = express();

app.use(router);

var server = app.listen(3000)

// var connection = mysql.createConnection(db);

// let sql_name = sql.userInfo;

// connection.connect();
// var temp = {}

// connection.query(sql_name, function (error, results) {
//     if (error) throw error;
//     temp = results;
//     // console.log('The solution is: ', results);
// });





