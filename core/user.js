
const pool = require('./connection');
const bcrypt = require('bcrypt'); 
const mysqlConnection = require('./connection');

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // store the data to MySql from new registers 
    // body is an object 
    create : function(body, callback) 
    {

        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd,10);

        // this array will contain the values of the fields.
        var ciphertext = [];
        // loop in the attributes of the object and push the values into the ciphertext array.
        for(prop in body){
            ciphertext.push(body[prop]);
        }
        // prepare the sql query
        let sql = "INSERT INTO users(username, password, email, zipcode) VALUES (?, ?, ?, ?)";
        // call the query give it the sql string and the values (ciphertext array)
        mysqlConnection.query(sql, ciphertext, function(err, result) {

            if(err) throw err;
            // return the last inserted id. if there is no error
        
            callback(result.insertId);
        });
    },

    createRequest : function(body, callback) 
    {

       
        // call the query give it the sql string and the values (ciphertext array)
        // this array will contain the values of the fields.
        var ciphertext = [];
        // loop in the attributes of the object and push the values into the ciphertext array.
        for(prop in body){
            ciphertext.push(body[prop]);
        }
        
        // prepare the sql query
        let sql = 'INSERT INTO request(username, title, totalAmount, amount, totalVolunteers, volunteers, reason, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        // call the query give it the sql string and the values (ciphertext array)
        mysqlConnection.query(sql, ciphertext, function(err, result) {

            if(err) throw err;
            // return the last inserted id. if there is no error
        
            callback(result.insertId);
        });
    },

    login : function(username, password, callback)
    {
        // find the user data by his username.
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.password)) {
                    // return his data.
                    callback(user);
                    return;
                }  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }

}

module.exports = User;