'use strict';

var fs = require('fs');
var tasks = fs.readdirSync('./gulp/tasks/');
var gulp = require('gulp');
var packageInfo = JSON.parse(fs.readFileSync('./package.json'));
var karmaConfig = {};
require('./../karma.conf.js')({
    set: function(conf) {
        karmaConfig = conf;
    }
});

require('./config');

var SRC_FOLDER = 'src';
var MODULES_FOLDER = SRC_FOLDER + '/modules';
var RELEASE_FOLDER = 'release';

var IMAGES_GLOB = SRC_FOLDER + '/assets/images/**/*';
var SCRIPTS_GLOB = MODULES_FOLDER + '/**/*.js';
var TEMPLATES_GLOB = MODULES_FOLDER + '/**/*.html';
var STYLES_GLOB = SRC_FOLDER + '/styles/**/*.scss';

var INDEX_SRC = SRC_FOLDER + '/app/index.html';
var STYLES_SRC = SRC_FOLDER + '/styles';

var ASSETS_RELEASE = RELEASE_FOLDER + '/assets';

require('gulp-tasks-riq/clean')({
    releaseFolder: RELEASE_FOLDER
});

require('gulp-tasks-riq/assets')({
    src: [SRC_FOLDER + '/assets/**/*', '!' + IMAGES_GLOB],
    dest: ASSETS_RELEASE
});

require('gulp-tasks-riq/default')();

require('gulp-tasks-riq/images')({
    src: IMAGES_GLOB,
    dest: ASSETS_RELEASE + '/images'
});

require('gulp-tasks-riq/index')({
    src: INDEX_SRC,
    dest: RELEASE_FOLDER,
    styles: 'app.css',
    scripts: 'app.js'
});

require('gulp-tasks-riq/lint')({
    src: SCRIPTS_GLOB
});

require('gulp-tasks-riq/minify')({
    src: RELEASE_FOLDER + '/' + packageInfo.name + '.js',
    dest: RELEASE_FOLDER
});

require('gulp-tasks-riq/serve')({
    serverPath: RELEASE_FOLDER,
    port: 8080
});

require('gulp-tasks-riq/styles')({
    src: [STYLES_SRC + '/' + packageInfo.name + '.scss', STYLES_SRC + '/app.scss'],
    dest: RELEASE_FOLDER
});

require('gulp-tasks-riq/watch')({
    livereload: [RELEASE_FOLDER + '/**/*', '!' + RELEASE_FOLDER + '/assets/**/*'],
    port: 35729,
    scripts: SCRIPTS_GLOB,
    index: INDEX_SRC,
    templates: TEMPLATES_GLOB,
    styles: STYLES_GLOB
});

require('gulp-tasks-riq/tests')();

require('gulp-tasks-riq/version')();

require('gulp-tasks-riq/karma')({
    karmaConf: karmaConfig,
    configure: function() {

    },
    testGlobs: [
        'src/**/*.spec.js'
    ]
});

require('gulp-tasks-riq/browserify-omega')({
    bundleConfigs: [{
        entries: ['./src/modules/index.js'],
        output: packageInfo.name + '.js'
    }, {
        entries: ['./src/app/index.js'],
        output: 'app.js'
    }],
    dest: RELEASE_FOLDER
});

gulp.task('templates', function(cb) {
    cb(); // noop for now, if you need template processing do it
});

gulp.task('release', function(cb) {
    cb(); // no op for version task
});

gulp.task('testsNoWatch', ['karma']); // need this task name for version task


tasks.forEach(function(task) {
    require('./tasks/' + task);
});