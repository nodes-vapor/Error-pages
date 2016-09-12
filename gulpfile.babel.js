'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';

gulp.task('scripts', ()=> {
	return gulp.src('./src/*.js')
		.pipe(babel())
		.pipe(concat('error.min.js'))
		.pipe(uglify({preserveComments: 'some'}))
		.pipe(gulp.dest('./dist'));
});
gulp.task('serve', ['scripts', 'sass'],()=> {
	browserSync({
		notify: false,
		files: ['./index.html', './dist/*.*'],
		server: {
			baseDir: '.'
		}
	})
	gulp.watch('./src/*.js',['scripts']);
		gulp.watch('./src/*.scss', ['sass']);
});
gulp.task('sass', function () {
	return gulp.src('./src/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist'))
});
gulp.task('default', ['scripts']);