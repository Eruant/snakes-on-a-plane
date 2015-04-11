var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel');

gulp.task('localhost', ['build'], function () {

    browserSync({
        server: {
            baseDir: './dest'
        }
    });

});

gulp.task('scripts', function () {
  return gulp.src('src/js/base.js')
    .pipe(gulp.dest('dest/js'));
});

gulp.task('templates', function () {
    return gulp.src('src/templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dest'));
});

gulp.task('styles', function () {
});

gulp.task('build', ['scripts', 'templates', 'styles']);

gulp.task('watch', function () {

});

gulp.task('default', ['localhost']);
