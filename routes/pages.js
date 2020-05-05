const express = require('express');
const User = require('../core/user');
const router = express.Router();
const path = require('path');
const auth = require('http-auth');
let rID;
let gAmount;
let gVol;
let rAmount;
let rVol;


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
    //res.redirect('/');
});

// Get requestSent page
router.get('/donationSent', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('donationSent', {opp:req.session.opp, name:user.username});
        return;
    }
    //res.redirect('/');
});


// Get donate page
router.get('/donate', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('donate', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Get requestSent page
router.get('/donateSent', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('donateSent', {opp:req.session.opp, name:user.username});
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

// Get home page
router.post('/done', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
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

// Post donation sent page
router.post('/donationSent', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('home', {opp:req.session.opp, name:user.username});
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

// Post request sent page
router.post('/requestview', (req, res, next) => {
    let users = req.session.user;
    
    if(user) {
       
        user.viewRequest(users.username, function(result) {
        
            res.render('requestview', {title: 'Requests', requests: result})
        });
    }
});

// Post notifications page
router.post('/notifications', (req, res, next) => {
    let users = req.session.user;
    
    if(user) {
       
        user.viewNotifications(users.username, function(result) {
        
            res.render('notifications', {title: 'Notifications', messages: result})
        });
    }
});


// Post request sent page
router.post('/response', (req, res, next) => {
    let users = req.session.user;
    
    if(user) {
       
        user.requests(users.username, function(result) {
        
            res.render('response', {title: 'Requests', requests: result})
        });
    }
});

// Post request sent page
router.post('/requestdelete', (req, res, next) => {
    let users = req.session.user;
    
    console.log(parseInt(req.body.Delete))
    let idData = parseInt(req.body.Delete)

    let userInput = {
        id: req.body.Delete
    };


    if(user) {
       
        user.deleteRequest(userInput, function(result) {      
        });

        user.viewRequest(users.username, function(result) {
        
            res.render('home');
        });
    }
});

// Post donate data
router.post('/donate', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('donate', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Post donate sent page
router.post('/donateSent', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('home', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Post make donation page
router.post('/makedonation', (req, res, next) => {
    let user = req.session.user;
    rID = req.body.Select;
    if(user) {
        res.render('response-form', {opp:req.session.opp, name:user.username});
        return;
    }
    res.redirect('/');
});

// Post make donation page
router.post('/responded', (req, res, next) => {
    let users = req.session.user;

    let userInput = {
        username: users.username,
        title: req.body.title,
        amount: req.body.amount,
        volunteers: req.body.volunteers,
        reason: req.body.reason,
        message: req.body.message
    };

    gAmount = req.body.amount;
    gVol = req.body.volunteers;
    if(user) {
        console.log(rID)
        user.showRequest(rID, function(result) {  
            rAmount = result[0].amount-gAmount;
            rVol = result[0].volunteers-gVol;

            let donorInput = {
                amount: rAmount,
                volunteers: rVol
            };

            let notify = {
                sender: users.username,
                reciever: result[0].username,
                requestid: rID,
                completed: 0,
                message: req.body.message
            };

            if(rAmount <= 0 && rVol <= 0){
                user.deleteRequest(rID)
                user.createNotification(notify, function(result) {
                });
                notify.completed = 1;
                user.createNotification(notify, function(result) {
                });
            }else if(rAmount <= 0){
                user.createNotification(notify, function(result) {
                });
                user.updateRequest(0, rVol, rID, function(result) {

                });
            }else if(rVol <= 0){
                user.createNotification(notify, function(result) {
                });
                user.updateRequest(rAmount, 0, rID, function(result) {
                });
            }else{
                user.createNotification(notify, function(result) {
                });
                user.updateRequest(rAmount, rVol, rID, function(result) {

                });
            }

        });
    }
    res.redirect('/donationSent');
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

// Post request data
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
    

    // call create function. to create a new user. if there is no error this function will return it's id.
    user.createRequest(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)

        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = users;
                req.session.opp = 0;
                res.redirect('/requestSent');
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});

// Post donate data
router.post('/donate', (req, res, next) => {
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
router.post('/donated', (req, res, next) => {
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
    user.createDonate(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        console.log(lastId)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/donateSent');
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