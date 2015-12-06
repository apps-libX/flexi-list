/**
 * Created by anonymoussc on 08/03/15 20:40.
 */

'use strict';

var moment   = require('moment'),
    S        = require('string'),
    argv     = require('yargs').argv,
    dataSrc  = require('./../config/dataSrc/dataSrc.json'),
    config   = require('./../config/config.js'),
    league   = require('./../templates/league.js'),
    composer = require('./../templates/composer.js'),
    laravel  = require('./../templates/laravel.js'),
    ngApps   = require('./../templates/ngApps.js'),
    ngApp    = require('./../templates/ngApp.js');

var
    precompile = {
        dataSrc : {
            author_name        : dataSrc.author_name,
            author_username    : whos_yousername(), //dataSrc.author_username
            author_website     : dataSrc.author_website,
            author_email       : dataSrc.author_email,
            package_name       : dataSrc.package_name,
            package_description: dataSrc.package_description,
            dateTime           : {
                now : moment().format('MMMM Do YYYY, h:mm:ss a'),
                year: moment().format('YYYY')
            },
            author_username_ucf: S(whos_yousername()).capitalize().s, // Upper case first letter
            author_username_sc : S('-' + whos_yousername()).camelize().s, // StudlyCaps
            author_username_cc : S(whos_yousername()).camelize().s, // camelCase
            author_username_alt: whos_yousername(true),
            package_name_ucf   : S(dataSrc.package_name).capitalize().s, // Upper case first letter
            package_name_sc    : S('-' + dataSrc.package_name).camelize().s, // StudlyCaps
            package_name_cc    : S(dataSrc.package_name).camelize().s // camelCase
        },
        config  : config,
        composer: composer,
        laravel : laravel,
        league  : league,
        ngApps  : ngApps,
        ngApp   : ngApp
    };

function whos_yousername(alt) {
    argv.generator = argv.g ? argv.g : argv.generator;

    if ((argv.generator === league.name) || (config.generator === league.name)) {
        if (((argv.generator === league.name) && (!config.generator)) || ((config.generator === league.name) && (!argv.generator))) {
            if (alt) {
                return 'thephpleague';
            }
            return league.name;
        }
    } else {
        return dataSrc.author_username;
    }

}

module.exports = precompile;