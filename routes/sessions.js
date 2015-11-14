'use strict';

var controller = require('../controllers/sessions');
    // routeValidator = require('express-route-validator'),
    // passport = require('passport');

module.exports = function (router) {
  router.get('/login', controller.getLogin);

  router.get('/signup', controller.getSignup);

  // router.post('/signup', routeValidator.validate({
  //   body: {
  //     address: { isRequired: false, note: 'Address object for the user' },
  //     location: { isRequired: false, note: 'Lat/Lng object for user' },
  //     password: { isRequired: true, note: 'Password of user' },
  //     username: { isRequired: true, isEmail: true, toLowercase: true, trim: true, note: 'Email of user' },
  //   }
  // }), controller.createAccount, passport.authenticate('local'), controller.handleLogin);
  //
  // router.post('/login', passport.authenticate('local'), controller.handleLogin);
  // router.get('/logout', controller.handleLogout);
  // router.get('/auth/facebook', passport.authenticate('facebook'));
  // router.get('/auth/facebook/callback', passport.authenticate('facebook'), controller.handleFacebookLoginSuccess);
};
