var pkg = require('./package.json'),
    configs = require('./gulpfile-configs');

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    jsmin = require('gulp-jsmin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    zip = require('gulp-zip'),
    bower = require('gulp-bower'),
    copy = require('gulp-copy'),
    csso = require('gulp-csso'),
    runSequence  = require('run-sequence');

var plugin_slug = configs.slug;

/**
 * Compiles admin SCSS
 */
gulp.task('admin_cssmin',function(){
    return gulp.src(configs.paths.admin_scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('admin.min.css'))
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./assets/dist/css'));
});

/**
 * Compiles public SCSS
 */
gulp.task('public_cssmin',function(){
    return gulp.src(configs.paths.public_scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('public.min.css'))
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./assets/dist/css'));
});

/**
 * Compile styles
 */
gulp.task('cssmin',function(callback){
    runSequence('admin_cssmin', 'public_cssmin', callback);
});

/**
 * Compiles plugin main JS file with browserify
 */
gulp.task('jsmin', ['browserify'] ,function(){
    return gulp.src(configs.paths.bundle_js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(plugin_slug+'.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/dist/js'));
});

/**
 * Creates the bundled version of plugin main JS file
 */
gulp.task('browserify', function(){
    return gulp.src(configs.paths.main_js)
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./assets/src/js'));
});

/**
 * Creates a folder with dist files of the plugin. This folder will be zipped by "gulp archive".
 */
gulp.task('make-package', function(){
    return gulp.src(configs.paths.build)
        .pipe(copy(configs.paths.build_dir+"/pkg/"+plugin_slug));
});

/**
 * Creates a zip package from the plugin dist files folder
 */
gulp.task('archive', function(){
    return gulp.src(configs.paths.build_dir+"/pkg/**")
        .pipe(zip(plugin_slug+'-'+pkg.version+'.zip'))
        .pipe(gulp.dest("./builds"));
});

/**
 * Performs a "bower-install"
 */
gulp.task('bower-install',function(){
    return bower();
});

/**
 * Performs a "bower-update"
 */
gulp.task('bower-update',function(){
    return bower({cmd: 'update'});
});

/**
 * Creates a redistributable package
 */
gulp.task('build', function(callback) {
    runSequence('bower-update', ['jsmin', 'cssmin'], 'make-package', 'archive', callback);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(configs.paths.main_js, ['jsmin']);
    gulp.watch(configs.paths.admin_scss, ['cssmin']);
    gulp.watch(configs.paths.public_scss, ['cssmin']);
});

gulp.task('default', function(callback){
    runSequence('bower-install', ['jsmin', 'cssmin'], 'watch', callback);
});