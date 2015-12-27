/**
 * Created by anonymous on 26/12/15 13:42.
 */

/**
 * @ngdoc filter
 * @name like_l
 * @description
 * Evaluates the "LIKE" condition with a wildcard on the left. Eg. %PATTERN
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('like_l', like_l);

    function like_l() {
        return like_lFilter;

        ////////////////

        function like_lFilter(value, pattern, options) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            if (options.insensitive) {
                return (value.toLowerCase().indexOf(pattern.toLowerCase(), value.length - pattern.length) !== -1);
            }
            else {
                return (value.indexOf(pattern, value.length - pattern.length) !== -1);
            }
        }
    }

})();

/*
flexiList.filter('like_l', function() {
    return function(value, pattern, options) {
        if (value == undefined || pattern == undefined) return true;
        if (options.insensitive)
            return (value.toLowerCase().indexOf(pattern.toLowerCase(), value.length - pattern.length) !== -1);
        else
            return (value.indexOf(pattern, value.length - pattern.length) !== -1);
    };
});
*/
