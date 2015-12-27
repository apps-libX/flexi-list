/**
 * Created by anonymous on 26/12/15 13:36.
 */

/**
 * @ngdoc filter
 * @name like_r
 * @description
 * Evaluates the "LIKE" condition with a wildcard on the right. Eg. PATTERN%
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('like_r', like_r);

    function like_r() {
        return like_rFilter;

        ////////////////

        function like_rFilter(value, pattern, options) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            if (options.insensitive) {
                return (value.toLowerCase().indexOf(pattern.toLowerCase()) === 0);
            }
            else {
                return (value.indexOf(pattern) === 0);
            }
        }
    }

})();

/*
flexiList.filter('like_r', function() {
    return function(value, pattern, options) {
        if (value == undefined || pattern == undefined) return true;
        if (options.insensitive)
            return (value.toLowerCase().indexOf(pattern.toLowerCase()) === 0);
        else
            return (value.indexOf(pattern) === 0);
    };
});
*/
