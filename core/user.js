
const bcrypt = require('bcrypt'); 
const mysqlConnection = require('./connection');

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defined
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

    // Find the user data by id or username.
    viewNotifications : function(user = null, callback)
    {


        console.log(user);
        // prepare the sql query
        let sql = `SELECT * FROM notifications WHERE reciever = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }

           
        });
    },

    // Find the user data by id or username.
    potentialRequest : function(user = null, callback)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        console.log(user);
        // prepare the sql query
        let sql = `SELECT * FROM request WHERE NOT username = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }

           
        });
    },

    // Find the user data by id or username.
    showPledge : function(user = null, callback)
    {

        console.log(user);
        // prepare the sql query
        let sql = `SELECT * FROM donate WHERE NOT username = ?`;

        console.log("begins here")
        console.log(user)
        console.log("SQL:")
        console.log(sql)
        mysqlConnection.query(sql, user, function(err, result1) {
            if(err) throw err

            if(result1.length) {
                callback(result1);
            }else {
                callback(null);
            }

           
        });
    },
    
    // Find the user data by id or username.
    viewRequest : function(user = null, callback)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        console.log(user);
        // prepare the sql query
        let sql = `SELECT * FROM request WHERE username = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }

           
        });
    },

    // Find the user data by id or username.
    potentialPledge : function(user = null, callback)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        // prepare the sql query
        let sql = `SELECT * FROM donate WHERE id = ?`;


        mysqlConnection.query(sql, user, function(err, result1) {
            if(err) throw err

            if(result1.length) {
                callback(result1);
            }else {
                callback(null);
            }

           
        });
    },

    // Find the user data by id or username.
    showRequest : function(user = null, callback)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        // prepare the sql query
        let sql = `SELECT * FROM request WHERE id = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }

           
        });
    },

    requests : function(user = null, callback)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        // prepare the sql query
        let sql = `SELECT * FROM request WHERE NOT username = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }

           
        });
    },

    // Find the user data by id or username.
    deleteRequest : function(user = null)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        // prepare the sql query
        let sql = `DELETE FROM request WHERE id = ?`;


        mysqlConnection.query(sql, user.id, function(err, result) {
            if(err) throw err

            console.log("Number of records deleted: " + result.affectedRows);
           
        });
    },

    // Find the user data by id or username.
    deletePledge : function(user = null)
    {
    
        // if the user variable is defined
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        // prepare the sql query
        let sql = `DELETE FROM donate WHERE id = ?`;


        mysqlConnection.query(sql, user, function(err, result) {
            if(err) throw err

            console.log("Number of records deleted: " + result.affectedRows);
           
        });
    },

    // Find the user data by id or username.
    updateRequest : function(rAmount, rVol, rID, callback)
    {
    
      
        // prepare the sql query
       // let sql = "UPDATE request SET(amount, volunteers) VALUES (?, ?) WHERE id = " + rID;
        let sql = "UPDATE request SET amount = " + rAmount + ", volunteers = " + rVol + " WHERE id = " + rID;
        // call the query give it the sql string and the values (ciphertext array)
        mysqlConnection.query(sql, function(err, result) {

            if(err) throw err;
            // return the last inserted id. if there is no error
            console.log("Number of records updated: " + result.affectedRows);
            
        });
        
        
        //let sql = `UPDATE request SET amount = ? WHERE id = 2`;

    },

    createNotification : function(body, callback) 
    {

        // this array will contain the values of the fields.
        var ciphertext = [];
        // loop in the attributes of the object and push the values into the ciphertext array.
        for(prop in body){
            ciphertext.push(body[prop]);
        }
        // prepare the sql query
        let sql = "INSERT INTO notifications(sender, reciever, requestid, completed, message) VALUES (?, ?, ?, ?, ?)";
        // call the query give it the sql string and the values (ciphertext array)
        mysqlConnection.query(sql, ciphertext, function(err, result) {

            if(err) throw err;
            // return the last inserted id. if there is no error
        
            callback(result);
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

    createDonate : function(body, callback) 
    {

       
        // call the query give it the sql string and the values (ciphertext array)
        // this array will contain the values of the fields.
        var ciphertext = [];
        // loop in the attributes of the object and push the values into the ciphertext array.
        for(prop in body){
            ciphertext.push(body[prop]);
        }
        
        // prepare the sql query
        let sql = 'INSERT INTO donate(username, title, totalAmount, amount, totalVolunteers, volunteers, reason, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
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