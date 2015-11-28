/**
 * Created by anonymoussc on 27/11/15 17:06.
 */

var gulp     = require('gulp');
var conflict = require('gulp-conflict');
var install  = require('gulp-install');
var rename   = require('gulp-rename');
var template = require('gulp-template');
//var iniparser = require('iniparser');
var inquirer = require('inquirer');
var moment   = require('moment');
var S        = require('string');
var _        = require('underscore.string');
var argv     = require('yargs').argv;

gulp.task('task1', function() {
    'use strict';

});

function processFile(src, fileName, dest) {

    var gulpDoing;

    //console.log('File src : ' + src);
    //console.log('File name : ' + fileName);
    //console.log('File dest : ' + dest);

    if (!fileName) {
        gulpDoing = gulp.src(src)
            .pipe(template(precompile.dataSrc))
            .pipe(gulp.dest(dest));

    } else {
        gulpDoing = gulp.src(src)
            .pipe(template(precompile.dataSrc))
            .pipe(rename(fileName))
            .pipe(gulp.dest(dest));
    }

    return gulpDoing;

}