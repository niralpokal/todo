var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var mocha = require('gulp-mocha')
var casperJs = require('gulp-casperjs')
var app = require('./app.js')

gulp.task('test', ['casper'],  function(){
    return gulp.src('app.spec.js').pipe(mocha()).once('end', function(){
      process.exit();
    })
});

gulp.task('casper', function(){
    var port = 8080
    var server = app.listen(port);
    return gulp.src('casper.spec.js').pipe(casperJs());
})
