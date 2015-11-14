'use strict';

var express = require('express'),
    router = express.Router(),
    pkg = require('../package');

router.get('/version', function (req, res) {
  return res.status(200).send({ version: pkg.version });
});

// Add session routes
require('./sessions')(router);

module.exports = router;
