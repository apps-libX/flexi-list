/**
 * Created by anonymoussc on 31/03/15 4:39.
 */

'use strict';

var moment  = require('moment'),
    S       = require('string'),
    dataSrc = require('./../../config/dataSrc/dataSrc.json'),
    cfg     = require('./../../config/config.js');

// path to directory
var name     = 'ngApps',
    srcPath  = cfg.templatesDirectory + '/ngApps/',
    destPath = cfg.workspaces + '/' + dataSrc.author_username + '/' + dataSrc.package_name + '/public/';

var imagesSrcPath   = srcPath + 'src/' + name + '/images/',
    imagesDestPath  = destPath + 'src/' + dataSrc.package_name + '/images/',
    scriptsSrcPath  = srcPath + 'src/' + name + '/scripts/',
    scriptsDestPath = destPath + 'src/' + dataSrc.package_name + '/scripts/',
    stylesSrcPath   = srcPath + 'src/' + name + '/styles/',
    stylesDestPath  = destPath + 'src/' + dataSrc.package_name + '/styles/';

var
    ngApps = {
        name          : name,
        // images/ svg
        svg           : {
            src     : imagesSrcPath + '/svg',
            fileName: false,
            dest    : imagesDestPath
        },
        // scripts/ animations
        animation     : {
            src     : scriptsSrcPath + '/' + name + '/src/animations',
            fileName: false,
            dest    : scriptsDestPath + dataSrc.package_name + '/src'
        },
        // boot/ config
        config        : {
            src     : scriptsSrcPath + '/' + name + '/src/boot/config/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + 'Cfg.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/boot/config'
        },
        // boot/ run
        run           : {
            src     : scriptsSrcPath + '/' + name + '/src/boot/run/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/boot/run'
        },
        // components/ appsComponents
        appsComponent : {
            src     : scriptsSrcPath + '/' + name + '/src/components/apps-components/*.txt',
            fileName: 'appsComponents.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/components/apps-components'
        },
        // components/ coreComponents
        coreComponent : {
            src     : scriptsSrcPath + '/' + name + '/src/components/core-components/*.txt',
            fileName: 'coreComponents.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/components/core-components'
        },
        // controllers
        controller    : {
            src     : scriptsSrcPath + '/' + name + '/src/controllers/*.txt',
            fileName: S('-' + dataSrc.package_name).camelize().s + 'Controller.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/controllers'
        },
        // tests/ controllers
        controllerTest: {
            src     : scriptsSrcPath + '/' + name + '/tests/unit/controllers/*.txt',
            fileName: S('-' + dataSrc.package_name).camelize().s + 'ControllerSpec.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/tests/unit/controller'
        },
        // directives
        directive     : {
            src     : scriptsSrcPath + '/' + name + '/src/directives/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/directives'
        },
        // tests/ directives
        directiveTest : {
            src     : scriptsSrcPath + '/' + name + '/tests/unit/directives/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + 'Spec.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/tests/unit/directives'
        },
        // filters
        filter        : {
            src     : scriptsSrcPath + '/' + name + '/src/filters/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/filters'
        },
        // languages
        language      : {
            src     : scriptsSrcPath + '/' + name + '/src/languages/**/*',
            fileName: false,
            dest    : scriptsDestPath + dataSrc.package_name + '/src/languages'
        },
        // constants
        constant      : {
            src     : scriptsSrcPath + '/' + name + '/src/provides/constants/*',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/provides/constants'
        },
        // values
        value         : {
            src     : scriptsSrcPath + '/' + name + '/src/provides/values/*',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/provides/values'
        },
        // factories
        factory       : {
            src     : scriptsSrcPath + '/' + name + '/src/provides/factories/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/provides/factories'
        },
        // tests/ provide/ factories
        factoryTest   : {
            src     : scriptsSrcPath + '/' + name + '/tests/unit/provides/factories/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + 'Spec.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/tests/unit/provides/factories'
        },
        // providers
        provider      : {
            src     : scriptsSrcPath + '/' + name + '/src/provides/providers/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + 'Service.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/provides/providers'
        },
        // tests/ provide/ providers
        providerTest  : {
            src     : scriptsSrcPath + '/' + name + '/tests/unit/provides/providers/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + 'ServiceSpec.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/tests/unit/provides/providers'
        },
        // provides/ services
        service       : {
            src     : scriptsSrcPath + '/' + name + '/src/provides/services/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src/provides/services'
        },
        // tests/ provide/ services
        serviceTest   : {
            src     : scriptsSrcPath + '/' + name + '/tests/unit/provides/services/*.txt',
            fileName: S(dataSrc.package_name).camelize().s + 'Spec.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/tests/unit/provides/services'
        },
        // tests/ provide/ services
        module        : {
            src     : scriptsSrcPath + '/' + name + '/src/' + name + '.txt',
            fileName: S(dataSrc.package_name).camelize().s + '.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src'
        },
        // ui-router/ states
        state         : {
            src     : scriptsSrcPath + '/' + name + '/src/states.txt',
            fileName: 'states.example.js',
            dest    : scriptsDestPath + dataSrc.package_name + '/src'
        },
        // // styles/ sass
        sass          : {
            src     : stylesSrcPath + '/sass/*.scss',
            fileName: S(dataSrc.package_name).camelize().s + '.example.scss',
            dest    : stylesDestPath + '/sass'
        },
        // styles/ myth
        myth          : {
            src     : stylesSrcPath + '/myth/*.css',
            fileName: S(dataSrc.package_name).camelize().s + '.example.css',
            dest    : stylesDestPath + '/myth'
        }
    };

module.exports = ngApps;
