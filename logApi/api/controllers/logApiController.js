'use strict';


var mongoose = require('mongoose'),
  Log = mongoose.model('Logs');

exports.store_logs = function(req, res) {
  console.log("==LOG== " + req.body);
  var new_log = new Log(req.body);
  new_log.save(function(err, log) {
    if (err)
      res.send(err);
    res.json(log);
  });
};