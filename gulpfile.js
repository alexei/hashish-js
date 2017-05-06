const gulp = require('gulp')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')
const umd = require('gulp-umd')

gulp.task('build', function() {
    return gulp
        .src('index.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(umd({
            exports: function(file) {
                return 'hashish'
            },
            namespace: function(file) {
                return 'hashish'
            },
            templateName: 'amdNodeWeb'
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('test', ['build'], function() {
    return gulp
        .src('tests/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
})

gulp.task('default', ['build'])
