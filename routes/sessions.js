'use strict';

var controller = require('../controllers/sessions'),
    passport = require('passport');

module.exports = function (router) {
  router.get('/login', controller.getLogin);

  router.get('/signup', controller.getSignup);

  router.post('/signup', passport.authenticate('signup-local', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }));

  router.post('/login', passport.authenticate('login-local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  router.get('/logout', controller.handleLogout);
};
