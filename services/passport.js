'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    sqlMock = require('./sql-mock'),
    bcrypt = require('bcrypt'),
    async = require('async');

passport.serializeUser( function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser( function (id, done) {
  return sqlMock.getUserById(id, done);
});

// Passes true or false into callback
function isValidPassword (user, password, callback) {
  return bcrypt.compare(password, user.password, callback);
}

// Passes hash into callback
function generateHash (password, callback) {
  async.waterfall([
    function generateSalt (callback) {
      return bcrypt.genSalt(10, callback);
    },
    function hashPassword (salt, callback) {
      return bcrypt.hash(password, salt, callback);
    }
  ], callback);
}

passport.use('login-local', new LocalStrategy({
  // passReqToCallback: true,
  usernameField: 'email',
}, function (username, password, done) {
  async.waterfall([
    function getUser (callback) {
      sqlMock.getUserByEmail(username, function (err, user) {
        if (err) return callback(err);

        if (!user) {
          var error = new Error('User not found');
          error.status = 401;
          return callback(err);
        }

        return callback(null, user);
      });
    },
    function confirmPasswordValid (user, callback) {
      isValidPassword(user, password, function (err, isValid) {
        if (err) return callback(err);

        if (!isValid) {
          var error = new Error('Password invalid');
          error.status = 401;
          return callback(error);
        }

        return callback(null, user);
      });
    }
  ], done);
}));

passport.use('signup-local', new LocalStrategy({
  passReqToCallback : true, // allows us to pass back the entire request to the callback
  usernameField: 'email',
}, function (req, username, password, done) {
  async.waterfall([
    function confirmUsernameAvailable (callback) {
      sqlMock.getUserByEmail(username, function (err, user) {
        if (err) return callback(err);

        if (user) {
          var error = new Error('User already exists');
          error.status = 409;
          return callback(error);
        }

        return callback();
      });
    },
    function hashPassword (callback) {
      return generateHash(password, callback);
    },
    function createUser (hash, callback) {
      return sqlMock.addUser({
        email: username,
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        password: hash,
      }, callback);
    }
  ], done);
}));
