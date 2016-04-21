var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var mocha = require('gulp-mocha')
var casperJs = require('gulp-casperjs')

gulp.task('test', ['casper'],  function(){
    return gulp.src('app.spec.js').pipe(mocha()).once('end', function(){
      process.exit();
    })
});

gulp.task('casper', function(){
  return gulp.src('casper.spec.js').pipe(casperJs());
})
