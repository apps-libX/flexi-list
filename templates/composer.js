/**
 * Created by anonymoussc on 08/03/15 11:05.
 */

'use strict';

var moment  = require('moment'),
    S       = require('string'),
    dataSrc = require('./../config/dataSrc/dataSrc.json'),
    cfg     = require('./../config/config.js');

// path to directory
var name     = 'composer',
    srcPath  = cfg.templatesDirectory + '/skeleton/',
    destPath = cfg.workspaces + '/' + dataSrc.author_username + '/' + dataSrc.package_name + '/';

var
    composer = {
        name : name,
        base : {
            src     : [
                srcPath + '.*',
                srcPath + '*.*',
                '!' + srcPath + 'src/',
                '!' + srcPath + 'tests/'
            ],
            fileName: false,
            dest    : destPath
        },
        src  : {
            src     : srcPath + 'src/' + '*.stub',
            fileName: S('-' + dataSrc.package_name).camelize().s + 'Class.php', // StudlyCaps
            dest    : destPath + 'src/'
        },
        tests: {
            src     : srcPath + 'tests/' + '*.stub',
            fileName: S('-' + dataSrc.package_name).camelize().s + 'Test.php', // StudlyCaps
            dest    : destPath + 'tests/'
        }
    };

module.exports = composer;
