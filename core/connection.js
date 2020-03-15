const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const mysqlConnection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // change to your mysql username.
    password: '123456', // change to your mysql password.
    database: 'virtual_disaster_relief' // change to your mysql database.
});

mysqlConnection.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        console.log("MySql connected...")
    return;
});

mysqlConnection.query = util.promisify(mysqlConnection.query);

module.exports = mysqlConnection;
