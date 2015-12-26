/**
 * Created by anonymous on 26/12/15 13:04.
 */

/**
 * @ngdoc filter
 * @name like_b
 * @description
 * Evaluates the "LIKE" condition with left and right wildcards. Eg. %PATTERN%
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('like_b', like_b);

    function like_b() {
        return like_bFilter;

        ////////////////

        function like_bFilter(value, pattern, options) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            if (options.insensitive) {
                return (value.toLowerCase().indexOf(pattern.toLowerCase()) !== -1);
            } else {
                return (value.indexOf(pattern) !== -1);
            }
        }
    }

})();

/*
flexiList.filter('like_b', function() {
    return function(value, pattern, options) {
        if (value == undefined || pattern == undefined) return true;
        if (options.insensitive)
            return (value.toLowerCase().indexOf(pattern.toLowerCase()) !== -1);
        else
            return (value.indexOf(pattern) !== -1);
    };
});
*/
