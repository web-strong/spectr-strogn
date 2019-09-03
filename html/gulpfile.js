'use strict';

const gulp			= require('gulp'),
	  sass			= require('gulp-sass'),
	  csso			= require('gulp-csso'),
	  autoprefixer	= require('gulp-autoprefixer'),
	  sourcemaps	= require('gulp-sourcemaps'),
	  tinypng		= require('gulp-tinypng'),
	  concat		= require('gulp-concat'),
	  browsersync	= require('browser-sync'),
	  reload 		= browsersync.reload;

// SASS
gulp.task('scss-build', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass({}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(gulp.dest('build/css'))
});
gulp.task('scss-temp', function() {
	return gulp.src(['src/css/*.css', 'src/scss/main.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('temp/css'))
		.pipe(reload({ stream: true }));
});

// Tinypng
gulp.task('tinypng-build', function () {
	return gulp.src('src/img/**/*.{png,jpg,gif,svg}')
		// .pipe(tinypng('nh-mi-8Xe8KU_IyZvaP3eOX5QMLzBEJa'))
		.pipe(gulp.dest('build/img'));
});
gulp.task('tinypng-temp', function () {
	return gulp.src('src/img/**/*.{png,jpg,gif,svg}')
		.pipe(gulp.dest('temp/img'))
		.pipe(reload({ stream: true }));
});

// Concat
gulp.task('libs-build', function() {
	return gulp.src(['node_modules/jquery/dist/jquery.min.js',
					 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
					 'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js',
					 'src/js/sly.min.js',
					 'src/js/slick.min.js'])
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('build/js'))
});
gulp.task('libs-temp', function() {
	return gulp.src(['node_modules/jquery/dist/jquery.min.js',
					 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
					 'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js',
					 'src/js/slick.min.js',
					 'src/js/sly.min.js'])
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('temp/js'))
		.pipe(reload({ stream: true }));
});

// Scripts
gulp.task('scripts-build', function() {
	return gulp.src('src/js/main.js')
		.pipe(gulp.dest('build/js'))
});
gulp.task('scripts-temp', function() {
	return gulp.src('src/js/main.js')
		.pipe(gulp.dest('temp/js'))
		.pipe(reload({ stream: true }));
});

gulp.task('html-temp', function() {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('temp/'))
		.pipe(reload({ stream: true }));
});

// Fonts
gulp.task('fonts-build', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});
gulp.task('fonts-temp', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('temp/fonts'));
});


// Watch
gulp.task('watch', function() {
   	gulp.watch('src/scss/**/*.scss', gulp.series('scss-temp'));
	gulp.watch('src/img/**/*', gulp.series('tinypng-temp'));
	gulp.watch('src/js/main.js', gulp.series('scripts-temp'));
    gulp.watch('src/fonts/**/*', gulp.series('fonts-temp'));
	gulp.watch('src/*.html', gulp.series('html-temp'));
    // reload();
});

// Browser Sync
gulp.task('browsersync', function() {
    browsersync({
		server: {
			baseDir: './temp'
		},
		host: 'localhost',
		port: 3000
	});
});


// Default development
gulp.task('default', gulp.series(
	gulp.parallel( 'html-temp', 'scss-temp', 'libs-temp', 'scripts-temp', 'tinypng-temp', 'fonts-temp'),
    gulp.parallel('watch', 'browsersync'),
));

// Build
gulp.task('build', gulp.series(
	gulp.parallel('scss-build', 'libs-build', 'scripts-build', 'tinypng-build', 'fonts-build')
));