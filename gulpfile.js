const gulp = require('gulp')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')
const umd = require('gulp-umd')
const eslint = require('gulp-eslint')

gulp.task('lint', function() {
    return gulp
        .src('index.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('build', ['lint'], function() {
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
