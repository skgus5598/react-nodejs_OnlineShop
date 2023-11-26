require("dotenv").config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(err => {
    if(err) console.error("mysql connection error : "+ err);
    else console.log("mysql is connected successfully!");
})
/*
module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn){
        conn.connect(function (err){
            if(err) console.error("mysql connection error : "+ err);
            else console.log("mysql is connected successfully!");
        });
    }
};
*/
module.exports = connection;