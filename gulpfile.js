var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fileinclude = require('gulp-file-include');
var cleanCSS = require('gulp-clean-css');

gulp.task('webserver', ['fileinclude', 'minCss', 'syncLib'], function() {

  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
  }));

});

gulp.task('fileinclude', function() {
  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
  })).pipe(gulp.dest('./dist/'));
});

gulp.task('minCss', function() {
  gulp.src(['./src/css/**/*.css']).pipe(cleanCSS()).pipe(gulp.dest('./dist/css/'));
});

gulp.task('syncLib', function(){
  gulp.src(['./src/lib/**/*']).pipe(gulp.dest('./dist/lib/'));
});

gulp.watch('./src/**/*.html', ['fileinclude']);
gulp.watch('./src/css/**/*.css', ['minCss']);