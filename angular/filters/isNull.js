/**
 * Created by anonymous on 26/12/15 13:00.
 */

/**
 * @ngdoc filter
 * @name is_null
 * @description
 * Evaluates the "IS NULL" condition
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('is_null', is_null);

    function is_null() {
        return is_nullFilter;

        ////////////////

        function is_nullFilter(value, pattern) {
            if (value === undefined) {
                return true;
            }

            return (value.toString().length == 0);
        }
    }

})();

/*
flexiList.filter('is_null', function() {
    return function(value, pattern) {
        if (value == undefined) return true;
        return (value.toString().length == 0);
    };
});
*/
