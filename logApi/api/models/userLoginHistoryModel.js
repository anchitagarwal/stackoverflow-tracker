'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginHistorySchema = new Schema({
	username: {
		type: String,
		required: 'Kindly enter the username'
	},
	time: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('UserLoginHistory', loginHistorySchema);