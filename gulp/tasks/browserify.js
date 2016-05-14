var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

module.exports = function() {
    return browserify('./src/js//index.js')
        //Pass desired output filename to vinyl-source-stream
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
};