/**
 * Created by anonymous on 26/12/15 12:45.
 */

/**
 * @ngdoc filter
 * @name is_not_null
 * @description
 * Evaluates the "IS NOT NULL" condition
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .filter('is_not_null', is_not_null);

    function is_not_null() {
        return is_not_nullFilter;

        ////////////////

        function is_not_nullFilter(value, pattern) {
            if (value === undefined) {
                return false;
            }

            return (value.toString().length > 0);
        }
    }

})();

/*
flexiList.filter('is_not_null', function() {
    return function(value, pattern) {
        if (value == undefined) return false;
        return (value.toString().length > 0);
    };
});
*/