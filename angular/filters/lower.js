/**
 * Created by anonymous on 26/12/15 14:02.
 */

/**
 * @ngdoc filter
 * @name lt
 * @description
 * Evaluates the "Lower" condition.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('lt', lt);

    function lt() {
        return ltFilter;

        ////////////////

        function ltFilter(value, pattern) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            return (value < pattern);
        }
    }

})();

/*
flexiList.filter('lt', function() {
    return function(value, pattern) {
        if (value == undefined || pattern == undefined) return true;
        return (value < pattern);
    };
});
*/
