var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var pump = require('pump');
var copy = require('copy');
var argv = require('yargs').argv;

var debug = (argv.debug === 'false') ? false : true;

gulp.task('sass', function(cb) {
	pump([
		gulp.src([
			'./node_modules/font-awesome/css/font-awesome.min.css',
			'./node_modules/bootstrap/dist/css/bootstrap.min.css',
			'./_resources/scss/app.scss'
		]),
		sass({
			outputStyle: debug ? '' : 'compressed'
		}),
		concat('app.min.css'),
		gulp.dest('./assets/css')
	], cb);
});

gulp.task('scripts', function(cb) {
	pump([
		gulp.src([
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/bootstrap/dist/js/bootstrap.min.js',
		]),
		uglify({
			compress: debug ? false : ''
		}),
		concat('app.min.js'),
		gulp.dest('./assets/js')
	], cb);
});

gulp.task('fonts', function() {
	var cb = function() {};
	copy('./node_modules/font-awesome/fonts/*', './assets/fonts', cb);
	copy('./node_modules/bootstrap/dist/fonts/*', './assets/fonts', cb);
});

gulp.task('default', ['sass', 'scripts', 'fonts']);
gulp.watch('./_resources/scss/*.scss', ['sass']);
