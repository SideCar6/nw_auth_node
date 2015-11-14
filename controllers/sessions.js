'use strict';

module.exports = {
  getLogin: function (req, res) {
    return res.render('login', {
      title: 'NovelWriter Login'
    });
  },

  getSignup: function (req, res) {
    return res.render('signup', {
      title: 'NovelWriter Signup'
    });
  }
};
