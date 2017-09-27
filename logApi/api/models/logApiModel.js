'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LogSchema = new Schema({
  user: {
    type: String,
    required: 'Kindly enter the name of users'
  },
  type: {
    type: String,
    required: 'Kindly enter the type of event'
  },
  time: {
    type: String,
    default: '0'
  },
  innerHTML: {
    type: String,
    required: 'Kindly enter the type of event'
  },
  outerHTML: {
    type: String,
    required: 'Kindly enter the type of event'
  }
});

module.exports = mongoose.model('Logs', LogSchema);