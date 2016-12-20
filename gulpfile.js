var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('css', function() {
    return gulp.src('./css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function() {
    return gulp.src(['./js/first/*.js', './js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});