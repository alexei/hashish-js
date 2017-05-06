const babel = require('gulp-babel')
const banner = '/*! <%= pkg.name %> <%= pkg.version %> | Copyright (c) 2017-present, <%= pkg.author %> | <%= pkg.license %> */\n'
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const header = require('gulp-header')
const mocha = require('gulp-mocha')
const pkg = require('./package.json')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const umd = require('gulp-umd')

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
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

gulp.task('test', ['build'], function() {
    return gulp
        .src('tests/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
})

gulp.task('default', ['build'])
