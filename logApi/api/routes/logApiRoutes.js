'use strict';
module.exports = function(app) {
  var logApi = require('../controllers/logApiController');

  // logApi Routes
  app.route('/log')
    .post(logApi.store_logs);
};