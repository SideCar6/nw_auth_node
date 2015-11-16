'use strict';

var fs = require('fs'),
    path = require('path'),
    storePath = path.join(__dirname, '../data/redis_store.json'),
    store = require('../data/sql_store');

module.exports = {
  addSession: function (id, data, callback) {
    store.sessions[id] = data;

    fs.writeFile(storePath, JSON.stringify(store, null, 2), {
      encoding: 'utf8'
    }, callback);
  },

  getSessionById: function (id, callback) {
    process.nextTick( function () {
      return callback(null, store.sessions[id]);
    });
  }
};
