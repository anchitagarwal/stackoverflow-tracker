'use strict';
module.exports = function(app, passport) {
	var userController = require('../controllers/loginController');

	// Login page
	app.get('/', function(req, res) {
		res.render('index.ejs', {message: req.flash('loginMessage')});
	});

	app.post('/', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash: true
	}));

	// Signup page
	app.get('/signup', function(req, res) {
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	// Process the signup page
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	// User profile page
	app.get('/profile', isLoggedIn, function(req, res) {
		var UserLoginHistory = require('../models/userLoginHistoryModel');
		var historyList = [];
		UserLoginHistory.find({ username: req.user }, function(err, docs) {
			for(var i = 0; i < docs.length; i++) {
				var t = docs[i]['time'];
				historyList.push(t);
			}
			res.render('profile.ejs', {
				username : req.user,
				historyList : historyList				
			});
		});
	});

	// User logs page
	app.post('/logs', isLoggedIn, function(req, res) {
		var logModel = require('../models/logApiModel');
		var logType = [];
		var logTime = [];
		var logHTML = [];
		logModel.find({ user: req.user }, function(err, docs) {
			for(var i = 0; i < docs.length; i++) {
				var type = docs[i]['type'];
				var time = docs[i]['time'];
				var inner_html = docs[i]['innerHTML'];
				inner_html = inner_html.replace(/,/g, ';')
				logType.push(type);
				logTime.push(time);
				logHTML.push(inner_html);
			}
			res.render('logs.ejs', {
				username : req.user,
				logType: logType,
				logTime: logTime,
				logHTML: logHTML
			});
		});
	})

	// User analytics page
	app.post('/analytics', isLoggedIn, function(req, res) {
		var logModel = require('../models/logApiModel');
		var logType = [];
		var logTime = [];
		var logHTML = [];
		var logUser = [];
		logModel.find(function(err, docs) {
			for(var i = 0; i < docs.length; i++) {
				var user = docs[i]['user'];
				var type = docs[i]['type'];
				var time = docs[i]['time'];
				var inner_html = docs[i]['innerHTML'];
				inner_html = inner_html.replace(/,/g, ';')
				logUser.push(user);
				logType.push(type);
				logTime.push(time);
				logHTML.push(inner_html);
			}
			res.render('analytics.ejs', {
				username : req.user,
				logUser: logUser,
				logType: logType,
				logTime: logTime,
				logHTML: logHTML
			});
		});
	})

	app.get('/user_data', isLoggedIn, function(req, res) {
		if(req.user === undefined)
			res.json({});
		else {
			res.json({
				username: req.user
			});
		}
	});

	// Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}