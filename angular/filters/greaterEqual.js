/**
 * Created by anonymous on 26/12/15 14:10.
 */

/**
 * @ngdoc filter
 * @name ge
 * @description
 * Evaluates the "Greater equal" condition.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('ge', ge);

    function ge() {
        return geFilter;

        ////////////////

        function geFilter(value, pattern) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            return (value >= pattern);
        }
    }

})();

/*
flexiList.filter('ge', function() {
    return function(value, pattern) {
        if (value == undefined || pattern == undefined) return true;
        return (value >= pattern);
    };
});
*/
