(function() {
    'use strict';

    angular.module('app.config').config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('pink')
            .warnPalette('red');
    });

})();
