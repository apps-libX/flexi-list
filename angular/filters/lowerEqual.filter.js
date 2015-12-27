/**
 * Created by anonymous on 26/12/15 13:55.
 */

/**
 * @ngdoc filter
 * @name le
 * @description
 * Evaluates the "Lower Equal" condition.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('le', le);

    function le() {
        return leFilter;

        ////////////////

        function leFilter(value, pattern) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            return (value <= pattern);
        }
    }

})();

/*
flexiList.filter('le', function() {
    return function(value, pattern) {
        if (value == undefined || pattern == undefined) return true;
        return (value <= pattern);
    };
});
*/
