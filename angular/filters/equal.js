/**
 * Created by anonymous on 26/12/15 14:30.
 */

/**
 * @ngdoc filter
 * @name eq
 * @description
 * Evaluates the "Equal" condition.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('eq', eq);

    function eq() {
        return eqFilter;

        ////////////////

        function eqFilter(value, pattern, options) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            if (!options) {
                return (value === pattern);
            }

            if (options.insensitive) {
                return (value.toLowerCase() === pattern.toLowerCase());
            }
            else {
                return (value === pattern);
            }
        }
    }

})();

/*
flexiList.filter('eq', function() {
    return function(value, pattern, options) {
        if (value == undefined || pattern == undefined) return true;

        if (!options)    return (value == pattern);

        if (options.insensitive)
            return (value.toLowerCase() == pattern.toLowerCase());
        else
            return (value == pattern);
    };
});
*/
