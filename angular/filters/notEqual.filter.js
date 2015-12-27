/**
 * Created by anonymous on 26/12/15 14:20.
 */

/**
 * @ngdoc filter
 * @name ne
 * @description
 * Evaluates the "Not equal" condition.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('ne', ne);

    function ne() {
        return neFilter;

        ////////////////

        function neFilter(value, pattern) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            return (value !== pattern);
        }
    }

})();

/*
flexiList.filter('ne', function() {
    return function(value, pattern) {
        if (value == undefined || pattern == undefined) return true;
        return (value != pattern);
    };
});
*/
