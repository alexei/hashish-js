const gulp = require('gulp')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')

gulp.task('build', () => {
    return gulp
        .src('index.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist'))
})

gulp.task('test', () => {
    return gulp
        .src('tests/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
})

gulp.task('default', ['test', 'build'])
