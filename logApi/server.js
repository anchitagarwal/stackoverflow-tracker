var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	Log = require('./api/models/logApiModel'),
	User = require('./api/models/loginModel'),
	UserLogin = require('./api/models/userLoginHistoryModel')
	configDB = require('./config/database.js');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(express.static(__dirname + '/views'));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'wubbalubbadubdub' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var log_routes = require('./api/routes/logApiRoutes');
var login_routes = require('./api/routes/loginRoutes');

log_routes(app); //register the route
login_routes(app, passport);

app.listen(port);

console.log('RESTful API server started on: ' + port);