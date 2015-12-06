/**
 * Created by anonymoussc on 08/03/15 11:05.
 */

'use strict';

var moment  = require('moment'),
    S       = require('string'),
    dataSrc = require('./../config/dataSrc/dataSrc.json'),
    cfg     = require('./../config/config.js');

// path to directory
var name     = 'laravel',
    srcPath  = cfg.templatesDirectory + '/laravel/',
    destPath = cfg.workspaces + '/' + dataSrc.author_username + '/' + dataSrc.package_name + '/';

var
    laravel = {
        name : name,
        base : {
            src     : [
                srcPath + '**/**/.*',
                srcPath + '**/**/*.*',
                '!' + srcPath + 'src/laravel/*.stub',
                '!' + srcPath + 'tests/'
            ],
            fileName: false,
            dest    : destPath
        },
        src  : {
            src     : srcPath + 'src/laravel/*.stub',
            fileName: S('-' + dataSrc.package_name).camelize().s + 'ServiceProvider.php', // StudlyCaps
            dest    : destPath + 'src/' + S('-' + dataSrc.package_name).camelize().s + '/' // StudlyCaps
        },
        tests: {
            src     : srcPath + 'tests/.*',
            fileName: false,
            dest    : destPath + 'tests/'
        }
    };

module.exports = laravel;
