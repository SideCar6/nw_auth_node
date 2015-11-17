'use strict';

var express = require('express'),
    logger = require('morgan'),
    exphbs = require('express-handlebars'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    bodyParser = require('body-parser'),
    passport = require('passport');

var app = express();

var hbs = exphbs({
  defaultLayout: 'main',
  compilerOptions: undefined,
  layoutsDir: 'views/layouts/',
  // partialsDir: 'views/partials/',
  // helpers: require('./utilities/handlebars-helpers')
});

// view engine setup
app.set('views', 'views');
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public/'));
app.use(cookieParser());
app.use(function (req, res, next) {
  console.log(JSON.stringify(req.cookies, null, 2));
  console.log(JSON.stringify(req.headers, null, 2));
  return next();
});

require('./services/passport');
app.use(session({
  cookie: {
    maxAge: 14 * 24 * 60 * 60000
  },
  resave: true,
  saveUninitialized: true,
  secret: process.env.NW_SESSION_SECRET,
  store: new RedisStore({
    url: process.env.REDISCLOUD_URL
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res /*, next*/) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res /*, next*/) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
