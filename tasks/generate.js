/**
 * Created by anonymoussc on 11/03/15 15:03.
 */

'use strict';

// Load plugins
var gulp       = require('gulp'),
    rename     = require('gulp-rename'),
    del        = require('del'),
    template   = require('gulp-template'),
    moment     = require('moment'),
    S          = require('string'),
    argv       = require('yargs').argv,
    precompile = require('./precompile.js');

var config   = precompile.config,
    league   = precompile.league,
    composer = precompile.composer,
    laravel  = precompile.laravel,
    ngApps   = precompile.ngApps,
    ngApp    = precompile.ngApp;

var key = '', keyProtected = 'name', obj = '', countObj = '', count = 0;

var process = {
    generate: processGenerate
};

function processGenerate() {

    argv.generator = argv.g ? argv.g : argv.generator;

    if ((argv.generator === league.name) || (config.generator === league.name)) {
        if (((argv.generator === league.name) && (!config.generator)) || ((config.generator === league.name) && (!argv.generator))) {

            obj      = league;
            countObj = objSize(obj) - 1;

            preProcessFile(obj, countObj);
        }
    } else if ((argv.generator === composer.name) || (config.generator === composer.name)) {
        if (((argv.generator === composer.name) && (!config.generator)) || ((config.generator === composer.name) && (!argv.generator))) {

            obj      = composer;
            countObj = objSize(obj) - 1;

            preProcessFile(obj, countObj);

        }
    } else if ((argv.generator === laravel.name) || (config.generator === laravel.name)) {
        if (((argv.generator === laravel.name) && (!config.generator)) || ((config.generator === laravel.name) && (!argv.generator))) {

            if (argv.ngApps) {

                obj      = ngApps;
                countObj = objSize(obj) - 1;

                // preProcessFile(obj, countObj);

                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if ((typeof obj[key].src !== 'undefined') && (typeof obj[key].fileName !== 'undefined') && (typeof obj[key].dest !== 'undefined')) {

                            processFile(obj[key].src, obj[key].fileName, obj[key].dest);

                        }
                    }
                }
            } else if (argv.ngApp) {

                obj      = ngApp;
                countObj = objSize(obj) - 1;

                // preProcessFile(obj, countObj);

                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if ((typeof obj[key].src !== 'undefined') && (typeof obj[key].fileName !== 'undefined') && (typeof obj[key].dest !== 'undefined')) {

                            processFile(obj[key].src, obj[key].fileName, obj[key].dest);

                        }
                    }
                }
            }

            obj      = laravel;
            countObj = objSize(obj) - 1;

            preProcessFile(obj, countObj);

        }
    } else if ((argv.generator === ngApps.name) || (config.generator === ngApps.name)) {
        if (((argv.generator === ngApps.name) && (!config.generator)) || ((config.generator === ngApps.name) && (!argv.generator))) {

            obj      = ngApps;
            countObj = objSize(obj) - 1;

            preProcessFile(obj, countObj);

        }
    } else if ((argv.generator === ngApp.name) || (config.generator === ngApp.name)) {
        if (((argv.generator === ngApp.name) && (!config.generator)) || ((config.generator === ngApp.name) && (!argv.generator))) {

            obj      = ngApp;
            countObj = objSize(obj) - 1;

            preProcessFile(obj, countObj);

        }
    }
}

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

function preProcessFile(o, co) {
    for (key in o) {
        if (o.hasOwnProperty(key)) {
            if ((typeof o[key].src !== 'undefined') && (typeof o[key].fileName !== 'undefined') && (typeof o[key].dest !== 'undefined')) {
                if (co !== count) {
                    processFile(o[key].src, o[key].fileName, o[key].dest);
                } else {
                    return processFile(o[key].src, o[key].fileName, o[key].dest);
                }
            }

            count++;
        }
    }
}

function objSize(obj) {

    var count = 0;

    if (typeof obj === "object") {
        if (Object.keys) {
            count = Object.keys(obj).length;
        } else if (window._) {
            count = _.keys(obj).length;
        } else if (window.$) {
            count = $.map(obj, function() {
                return 1;
            }).length;
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    count++;
                }
            }
        }
    }

    return count;
}

module.exports = process;
