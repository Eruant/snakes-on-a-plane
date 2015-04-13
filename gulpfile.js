var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  jade = require('gulp-jade'),
  //babel = require('gulp-babel'),
  fs = require('fs'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  sass = require('gulp-sass'),
  reload = browserSync.reload;

gulp.task('localhost', ['build'], function () {

  browserSync({
    server: {
      baseDir: './dest'
    }
  });

  gulp.watch('src/js/**/*', ['scripts']);
  gulp.watch('src/templates/**/*', ['templates']);
  gulp.watch('src/scss/**/*', ['styles']);

});

gulp.task('scripts1', function () {
  return gulp.src('src/js/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dest/js'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('scripts', function () {

  browserify({
    debug: true
  })
    .transform(babelify)
    .require('./src/js/app.js', {
      entry: true
    })
    .bundle()
    .on('error', function (err) {
      console.log('Error: ' + err.message);
    })
    .pipe(fs.createWriteStream('dest/js/app.js'))
    .on('end', function () {
      reload({
        stream: true
      });
    });

});

gulp.task('templates', function () {
    return gulp.src('src/templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dest'))
        .pipe(reload({
          stream: true
        }));
});

gulp.task('styles', function () {
  return gulp.src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dest/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('build', ['scripts', 'templates', 'styles']);

gulp.task('default', ['localhost']);
