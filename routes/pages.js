const express = require('express');
const User = require('../core/user');
const router = express.Router();
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
    file: path.join(__dirname, '../routes/admin.htpasswd'),
});

// create an object from the class User in the file core/user.js
const user = new User();

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('index', {title:"Virtual Disaster Relief"});
})

//Router.post('/admin-register', basic.check(function(req, res) {
//    res.render('admin-register', { title: 'Registration' });
//    return;
//  res.redirect('/');
//}));

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Get request page
router.get('/request', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('request', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Get requestSent page
router.get('/requestSent', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('requestSent', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).

    user.login(req.body.username, req.body.password, function(result) {
     console.log(req.body.username + "  " + req.body.password);
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect! Please go back to the page and try again!');
        }
    })

});

// Post request data
router.post('/request', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('request', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Post request sent page
router.post('/requestSent', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('home', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});


// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        zipcode: req.body.zipcode
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });
    
        }else {
            console.log('Error creating a new user ...');
        }
    });

});

// Post register data
router.post('/requested', (req, res, next) => {
    // prepare an object containing all user inputs.
    let users = req.session.user;

        let userInput = {
            username: users.username,
            title: req.body.title,
            totalAmount: req.body.amount,
            amount: req.body.amount,
            totalVolunteers: req.body.volunteers,
            volunteers: req.body.volunteers,
            reason: req.body.reason,
            message: req.body.message
        };
    
    console.log(users.username)
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.createRequest(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        console.log(lastId)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/requestSent');
            });



        }else {
            console.log('Error creating a new user ...');
        }
    });

});

// Post admin data
router.get('/admin', basic.check((req, res, next) => {  
console.log("getting here");
    if(req.session.user) {
    
        res.redirect('/home');

    }
}));


// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;