/**
 * Created by anonymous on 26/12/15 23:58.
 */

(function() {
    'use strict';

    angular
        .module('flexiList')
        .directive('crudTable', crudTable);

    crudTable.$inject = [];

    /* @ngInject */
    function crudTable() {
        var directive = {
            //bindToController: true,
            controller : crudTableController,
            //controllerAs    : 'vm',
            link       : link,
            restrict   : 'E',
            scope      : {
                list: '=',
                ct  : '='
            },
            templateUrl: function(elem, attr) {
                return attr.template;
            }
        };

        return directive;

        function link(scope, element, attrs) {

        }
    }

    crudTableController.$inject = ['$scope', 'gettext'];

    /* @ngInject */
    function crudTableController($scope, gettext) {
        $scope.ct.busy = false;
        $scope.ct.page = 1;

        $scope.$on('flStartOp', function($e, $args) {
            $scope.ct.busy = true;
        });

        $scope.$on('flComplete', function($e, $args) {
            $scope.ct.busy = false;
        });

        $scope.ct.pageChanged = function() {
            $scope.list.changePage($scope.list.pagination_info.currpage);
        };

        $scope.ct.setSearch = function(field) {
            $scope.ct.search_field = field;
        };

        $scope.ct.colIsSortable = function(col) {
            if (col.sortable === false) {
                return false;
            }

            return $scope.list.sortEnabled();
        };

        $scope.ct.search = function() {

            var v_where = [];

            if ($scope.ct.search_field && $scope.ct.search_value) {
                v_where = [{
                    field    : $scope.ct.search_field.field,
                    condition: $scope.ct.search_field.condition,
                    value    : $scope.ct.search_value,
                    options  : $scope.ct.search_field.options
                }];
            }

            if ($scope.list.options.jsonFile) {
                $scope.list.change({
                    where: v_where
                });
            } else {
                $scope.list.loadData({
                    where: v_where
                }, true);
            }
        };

        $scope.ct.sort = function(e, sort_field, sort_type) {
            if ($scope.list.options.jsonFile) {
                $scope.list.change({
                    orderby: [{
                        field: sort_field,
                        type : sort_type
                    }]
                });
            } else {
                $scope.list.loadData({
                    orderby: [{
                        field: sort_field,
                        type : sort_type
                    }]
                });
            }
        };

        $scope.ct.getCheckedStr = function() {
            if ($scope.list.getToggleSelNextState()) {
                return gettext('Uncheck all rows');
            } else {
                return gettext('Check all rows');
            }
        };

        $scope.ct.getCheckedIcon = function(ico, morphTo) {
            if ($scope.list.getToggleSelNextState()) {
                return morphTo;
            } else {
                return ico;
            }
            //return ico;
        };

        $scope.ct.iconMorphTo = function(ico, morphTo) {
            //$scope.ct.icon = morphTo;
            if ($scope.ct.icon === ico) {
                $scope.ct.icon = morphTo;
            } else {
                $scope.ct.icon = ico;
            }
        };
    }

})();

