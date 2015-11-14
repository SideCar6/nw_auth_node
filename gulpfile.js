'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var sources = {
  app: [
    'app.js',
    'controllers/**/*.js',
    'gulpfile.js',
    'routes/**/*.js',
    'server.js',
    'services/**/*.js',
  ],
  templates: [
    'views/**/*.handlebars',
  ],
  test: ['test/**/*Spec.js']
};

gulp.task('develop', function () {
  return nodemon({
    script: 'app.js',
    watch: Array.prototype.concat.apply([], sources.app, sources.templates),
    ext: 'js handlebars'
  });
});

gulp.task('jshint', function() {
  return gulp.src(Array.prototype.concat.apply([], sources.app, sources.test))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint', 'develop']);
