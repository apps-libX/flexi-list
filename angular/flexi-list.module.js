/**
 * Created by anonymous on 13/12/15 11:09.
 */

(function() {
    'use strict';

    angular
        .module('appFoundation', [
            /* Angularjs */
            'ngMaterial',
            'ngMessages',
            'ngResource',

            /* 3rd-party */
            'ui.router',
            'satellizer',
            'restangular',
            'ngStorage',
            'angular-loading-bar',
            'ngMdIcons',
            'toastr',
            'vAccordion',

            /* Intra-services */
            'inServices.exception',
            'inServices.logger',
            'inServices.routes'
        ]);

    angular.module('widgets', []);

    angular.module('inServices.exception', []);
    angular.module('inServices.logger', []);
    angular.module('inServices.routes', []);

})();