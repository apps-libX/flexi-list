/**
 * Created by anonymous on 26/12/15 12:34.
 */

/**
 * @ngdoc filter
 * @name regexp
 * @description
 * Evaluates the a condition based on a regular expression
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('regexp', regexp);

    function regexp() {
        return regexpFilter;

        ////////////////

        function regexpFilter(value, pattern, options) {
            //return parameters;
            if (value === undefined || pattern === undefined) {
                return true;
            }

            var regex = new RegExp(pattern, options.modifier);
            return regex.test(value);
        }
    }

})();

/*
 flexiList.filter('regexp', function() {
 return function(value, pattern, options) {
 if (value == undefined || pattern == undefined) return true;
 var regex = new RegExp(pattern, options.modifier);
 return regex.test(value);
 };
 });*/
