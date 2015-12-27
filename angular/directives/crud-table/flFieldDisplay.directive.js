/**
 * Created by anonymous on 27/12/15 0:13.
 */

(function() {
    'use strict';

    angular
        .module('flexiList')
        .directive('flFieldDisplay', flFieldDisplay);

    flFieldDisplay.$inject = [];

    /* @ngInject */
    function flFieldDisplay() {
        var directive = {
            //bindToController: true,
            //controller      : ControllerName,
            //controllerAs    : 'vm',
            link    : link,
            restrict: 'E'
            //scope           : {}
        };

        return directive;

        function link(scope, element, attrs) {
            if (scope.ct.options.displayField) {
                scope.ct.options.displayField(scope, element, attrs);
            } else {
                element.html(attrs['value']);
            }
        }
    }

    //ControllerName.$inject = [''];

    /* @ngInject */
    /*
     function ControllerName() {

     }
     */

})();

