const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('webserver', function () {
  gulp.src('')
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      livereload: true,
      open: true
    }));
});
