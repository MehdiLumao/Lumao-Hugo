var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('css', function() {
    return gulp.src('./themes/lumeo/static/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./themes/lumeo/static/dist/'));
});

gulp.task('js', function() {
    return gulp.src(['./themes/lumeo/static/js/first/*.js', './themes/lumeo/static/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./themes/lumeo/static/dist/'));
});
