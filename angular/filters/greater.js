/**
 * Created by anonymous on 26/12/15 14:16.
 */

/**
 * @ngdoc filter
 * @name gt
 * @description
 * Evaluates the "Greater" condition.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('gt', gt);

    function gt() {
        return gtFilter;

        ////////////////

        function gtFilter(value, pattern) {
            if (value === undefined || pattern === undefined) {
                return true;
            }

            return (value > pattern);
        }
    }

})();

/*
flexiList.filter('gt', function() {
    return function(value, pattern) {
        if (value == undefined || pattern == undefined) return true;
        return (value > pattern);
    };
});
*/
