var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('css', function() {
    return gulp.src('./themes/lumao/static/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./themes/lumao/static/dist/'));
});

gulp.task('js', function() {
    return gulp.src(['./themes/lumao/static/js/first/*.js', './themes/lumao/static/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./themes/lumao/static/dist/'));
});
