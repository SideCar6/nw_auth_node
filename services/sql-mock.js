'use strict';

var fs = require('fs'),
    path = require('path'),
    uuid = require('node-uuid'),
    storePath = path.join(__dirname, '../data/sql_store.json'),
    store = require('../data/sql_store');

module.exports = {
  addUser: function (user, callback) {
    if (store.emails[user.email]) {
      return callback(new Error('User already exists'));
    }

    var id = user.id = uuid.v4();
    store.emails[user.email] = id;
    store.users[id] = user;

    fs.writeFile(storePath, JSON.stringify(store, null, 2), {
      encoding: 'utf8'
    }, function (err) {
      return callback(err, user);
    });
  },

  getUserByEmail: function (email, callback) {
    process.nextTick( function () {
      var id = store.emails[email];

      return callback(null, store.users[id]);
    });
  },

  getUserById: function (id, callback) {
    process.nextTick( function () {
      return callback(null, store.users[id]);
    });
  }
};
