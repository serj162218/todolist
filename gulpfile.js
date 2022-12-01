var gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const express = require('gulp-express');

gulp.task('webserver', function () {
    nodemon({
        script: './app/app.ts',
    });

    gulp.watch('./app/app.js', express.notify);
    gulp.watch('./app/view/*.html', express.notify);
});

gulp.task('serve', gulp.series('webserver'));