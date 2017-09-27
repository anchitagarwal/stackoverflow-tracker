// load up the Strategy
var localStrategy = require('passport-local').Strategy;

// load user model
var User = require('../api/models/loginModel');

// load mongoose for saving login history
var mongoose = require('mongoose');

function saveUserLogin(user) {
    UserLoginHistory = mongoose.model('UserLoginHistory');
    console.log("==LOGIN HISTORY==");
    var new_hist = new UserLoginHistory({
        username: user,
        time: Date.now()
    });
    new_hist.save(function(err, log) {
        if(err)
            console.log(err);
        console.log(log);
    });
}

module.exports = function(passport) {
	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // local signup strategy
    passport.use('local-signup', new localStrategy({
    	usernameField: 'username',
    	passwordField: 'password',
    	passReqToCallback: true
    },
    function(req, username, password, done) {
    	// asynchronous
    	process.nextTick(function() {
    		// find a user whose username is the same as the forms username
        	// we are checking to see if the user trying to login already exists
        	User.findOne({'username' : username}, function(err, user) {
        		// if there are any errors, return the error
        		if(err)
        			return done(err);

        		// check to see if theres already a user with that username
        		if(user) {
        			return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        		} else {
        			// if there is no username, then create the user
        			var new_user = new User();

        			// set the user's local credentials
        			new_user.username = username;
        			new_user.password = new_user.generateHash(password);

        			// save the user
                    saveUserLogin(username);
        			new_user.save(function(err) {
        				if(err)
        					throw err;
        				return done(null, new_user);
        			});
        		}
        	});
    	});
    }));

    // local login strategy
    passport.use('local-login', new localStrategy({
    	usernameField: 'username',
    	passwordField: 'password',
    	passReqToCallback: true
    },
    function(req, username, password, done) {
    	// asynchronous
    	process.nextTick(function() {
    		// find a user whose username is the same as the forms username
        	// we are checking to see if the user trying to login already exists
        	User.findOne({'username' : username}, function(err, user) {
        		// if there are any errors, return the error
        		if(err)
        			return done(err);

        		// if no user found, return the message
        		if(!user)
        			return done(null, false, req.flash('loginMessage', 'No user found.'));

        		// If password is incorrect
        		if(!user.validPassword(password))
        			return done(null, false, req.flash('loginMessage', 'Incorrect password.'));

                saveUserLogin(username);
        		return done(null, user);
        	});
    	});
    }));
};