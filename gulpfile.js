var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('css', function() {
    return gulp.src('./css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/'));
});