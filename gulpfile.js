'use strict';

// Require Gulp
var gulp = require('gulp');

// Load Gulp plugins
var plugins = require('gulp-load-plugins')();

// Config
var cargobay = {
    scss: 'cb*/scss/*.scss',
    js: 'cb*/js/*.js',
    test: 'cb*test/*.js',
};

var mocha = require('gulp-mocha');

gulp.task('mocha', function() {
  return gulp.src(cargobay.test)
    .pipe(mocha());
});

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('js-lint', function() {
  return gulp.src(cargobay.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish, { verbose: true }))
    .pipe(jshint.reporter('fail'))
});

var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
  gulp.src(cargobay.scss)
    .pipe(scsslint({
        'config': 'scsslint.yml',
        'bundleExec': true,
        'reporterOutputFormat': 'Checkstyle',
    }))
    .pipe(scsslint.failReporter('E'));

});

gulp.task('test', function () {
    gulp.start('mocha');
    gulp.start('js-lint');
    gulp.start('scss-lint');
});

var clean = require('gulp-clean');

gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});

gulp.task('dist',['clean'], function(){
  gulp.src(['demo/*', 'cbAudioplayer/demo/*'])
  .pipe(gulp.dest('dist'));
});

var ghPages = require('gulp-gh-pages');
gulp.task('deploy',['dist'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
