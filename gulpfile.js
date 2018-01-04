var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');


gulp.task('js', function(){
    gulp.src('app/configs/public/js/*.js')
    .pipe(concat('final-script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/configs/public/js'));
 });
 
 gulp.task('css', function(){
    gulp.src('app/configs/public/css/*.css')
    .pipe(concat('final-style.css'))
    .pipe(minify())
    .pipe(gulp.dest('app/configs/public/css'));
 });
 
 gulp.task('default',['js','css'],function(){
 });