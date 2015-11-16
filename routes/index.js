'use strict';

var express = require('express'),
    router = express.Router(),
    pkg = require('../package');

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

router.get('/version', function (req, res) {
  return res.status(200).send({ version: pkg.version });
});

router.get('/', ensureAuthenticated, function (req, res) {
  return res.render('index', {
    title: 'Welcome!'
  });
});

// Add session routes
require('./sessions')(router);

module.exports = router;
