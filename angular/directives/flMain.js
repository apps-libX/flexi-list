/**
 * Created by anonymous on 26/12/15 14:39.
 */

/**
 * @ngdoc directive
 * @name flMain
 * @description
 * Exposes the API to the templates.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .directive('flMain', flMain);

    flMain.$inject = [];

    /* @ngInject */
    function flMain() {
        var directive = {
            bindToController: true,
            controller      : flMainCtrl,
            //controllerAs    : 'vm',
            link            : link,
            restrict        : 'E',
            scope           : {list: '='}
        };

        return directive;

        function link(scope, element, attrs) {

        }
    }

    flMainCtrl.$inject = ['$scope', '$log', '$q', '$http', '$filter', 'flexiListService'];

    /* @ngInject */
    function flMainCtrl($scope, $log, $q, $http, $filter, flexiListService) {
        var vm;
        vm       = this;
        vm.title = 'flMainCtrl';

        var options = {
            data                      : false,
            jsonFile                  : false,
            listURL                   : false,
            autoload                  : true,
            selectable                : true,
            multiselect               : true,
            limit                     : false,
            searchable                : true,
            searchOnClient            : false,
            where                     : [],
            sortable                  : true,
            sortOnClient              : false,
            orderby                   : [],
            pagination                : true,
            paginationOnClient        : false,
            pagination_clear_selection: true,
            pagesize                  : 10,
            pages                     : 5,
            method                    : 'GET',
            urlencoded                : true,
            log                       : {id: 'FL', err: false, debug: false}
        };

        // Dataset as loaded from source
        $scope.list.loadedDS = false;

        // Dataset after filter, sort and limit operations
        $scope.list.client_ds;
        var ds_length;

        // Dataset after pagination (records displayed)
        $scope.list.records = [];
        var offset          = 0;

        // Pagination information
        $scope.list.pagination_info = {};

        init();

        function init() {
            if (!$scope.list) {
                if (options.log.err) {
                    $log.log(options.log.id + ' - undefined scope.');
                }

                return;
            }

            angular.extend(options, $scope.list.options);

            /** Trigger data loading
             * @public
             * @param p_options options.
             */
            $scope.list.loadData = function(p_options, offset_reset) {

                angular.extend(options, p_options);

                if (offset_reset) {
                    offset = 0;
                }

                loadData();
            };

            /** Change options without reloading data
             * @public
             * @param p_options options.
             */
            $scope.list.change = function(p_options) {
                change(p_options);
            };

            /** Reloads data using the current options settings
             * @public
             */
            $scope.list.refresh = function() {
                loadData();
            };

            /** Returns the select enabled status
             * @public
             */
            $scope.list.selectEnabled = function() {
                return options.selectable;
            };

            /** Returns the select enabled status
             * @public
             */
            $scope.list.multiselectEnabled = function() {
                return (options.selectable && options.multiselect);
            };

            /** Returns the pagination enabled status
             * @public
             */
            $scope.list.paginationEnabled = function() {

                if (!options.pagination) {
                    return false;
                }

                if ($scope.list.records.length > 0) {
                    return true;
                }

                return false;
            };

            /** Returns the sort enabled status
             * @public
             */
            $scope.list.sortEnabled = function() {
                return options.sortable;
            };

            /** Returns the search enabled status
             * @public
             */
            $scope.list.searchEnabled = function() {
                return options.searchable;
            };

            /** Returns true whenever the result set has no records
             * @public
             */
            $scope.list.isEmpty = function() {
                return ($scope.list.records.length === 0 && $scope.list.loadedDS);
            };

            if (options.sortable) {
                makeScopeSortable();
            }

            if (options.pagination) {
                makeScopePagination();
            }

            if (options.selectable) {
                makeScopeSelectable();
            }

            if (options.autoload) {
                loadData();
            }
        }

        //************************************************************
        // Sortable
        //************************************************************
        var sorted = [];

        function makeScopeSortable() {
            /** Returns true whenever the list is sorted "asc" by the given field
             * @public
             */
            $scope.list.isSortedAsc = function(field) {
                if (!sorted) {
                    return false;
                }

                return (sorted[field] === 'asc');
            };

            /** Returns true whenever the list is sorted "desc" by the given field
             * @public
             */
            $scope.list.isSortedDesc = function(field) {
                if (!sorted) {
                    return false;
                }

                return (sorted[field] === 'desc');
            };
        }

        function setOrderby(orderby) {
            options.orderby = orderby;
            sorted          = transformSorted();
        }

        /*
         function addOrderby(orderby)
         {
         var replaced = false;

         for (var i=0; i < options.orderby.length; i++)
         {
         if (options.orderby[i].field == orderby.field)
         {
         options.orderby[i].type = orderby.type;
         replaced = true;
         break;
         }
         }

         if (! replaced)
         options.orderby.push({
         field: orderby.field,
         type: orderby.type
         });

         sorted = transformSorted();
         }
         */

        function transformSorted() {
            var arr = [];

            if (options.orderby) {
                for (var i = 0; i < options.orderby.length; i++) {
                    arr[options.orderby[i].field] = options.orderby[i].type;
                }
            }

            return arr;
        }

        //************************************************************
        // Record Selection
        //************************************************************
        var selectedRecord = false;
        var selectedCount  = 0;
        var allSelected    = false;

        function makeScopeSelectable() {
            /** Returns true whenever the given record is selected
             * @public
             */
            $scope.list.isRecordSelected = function(record) {
                if (!record.flSelected) {
                    return false;
                }

                return true;
            };

            /** Toggles record selection
             * @public
             */
            $scope.list.recordToggleSelect = function(record) {
                if (record.flSelected) {
                    recordUnselect(record, false);
                } else {
                    recordSelect(record, false);
                }
            };

            /** Triggers the validation of record selection after changing record.flSelected model.
             * @public
             */
            $scope.list.enforceSelection = function(record) {
                if (record.flSelected) {
                    recordSelect(record, true);
                } else {
                    recordUnselect(record, true);
                }
            };

            /** Returns the next selection state for all record
             * @public
             */
            $scope.list.getToggleSelNextState = function() {
                return allSelected;
            };

            if (options.multiselect) {
                /** Toggles the selection state for all record
                 * @public
                 */
                $scope.list.toggleSelectAll = function() {

                    if (!$scope.list.records) {
                        return;
                    }

                    // Reverse selected state and apply
                    allSelected = (!allSelected);
                    selectionApplyAll(allSelected, true);
                };
            }

            /** Returns the selected records count
             * @public
             */
            $scope.list.getSelectedCount = function() {
                return selectedCount;
            };

            /** Returns the selected records array
             * @public
             */
            $scope.list.getSelectedRecords = function() {

                var selection = [];

                if ($scope.list.records) {
                    angular.forEach($scope.list.records, function(record) {
                        if (record.flSelected) {
                            selection.push(record);
                        }
                    });
                }

                return selection;
            };
        }

        function selectionApplyAll(selected, current_page) {
            if (current_page) {
                angular.forEach($scope.list.records, function(record) {
                    if (selected) {
                        recordSelect(record, false);
                    }
                    else {
                        recordUnselect(record, false);
                    }
                });
            }
            else {
                angular.forEach($scope.list.client_ds, function(record) {
                    if (selected) {
                        recordSelect(record, false);
                    }
                    else {
                        recordUnselect(record, false);
                    }
                });
            }

            allSelected = selected;
        }

        function recordSelect(record, force) {
            if (record.readonly) {
                return;
            }

            if (!force) {
                if (record.flSelected) {
                    return;
                }
            }

            if (options.multiselect) {
                record.flSelected = true;
                selectedCount++;
            } else {
                if (selectedRecord) {
                    selectedRecord.flSelected = false;
                }

                record.flSelected = true;
                selectedRecord    = record;
                selectedCount     = 1;
            }
        }

        function recordUnselect(record, force) {
            if (record.readonly) {
                return;
            }

            if (!force) {
                if (!record.flSelected) {
                    return;
                }
            }

            if (options.multiselect) {
                record.flSelected = false;
                selectedCount--;
            } else {
                selectedRecord    = false;
                record.flSelected = false;
                selectedCount     = 0;
            }
        }

        //************************************************************
        // Pagination
        //************************************************************

        function makeScopePagination() {
            /** Triggers page change
             * @public
             * @param pagenum number of requested page.
             */
            $scope.list.changePage = function(pagenum) {
                getPage(pagenum);
            };

            /** Changes the page size.
             * @public
             */
            $scope.list.setPageSize = function(size) {
                options.pagesize = size;
                getPage(1);
            };
        }

        function getPage(pagenum) {
            if (pagenum < 1) {
                return;
            }

            if (pagenum > $scope.list.pagination_info.totalpages) {
                return;
            }

            $scope.$emit('flStartOp', {op: 'getPage'});

            // Unselect records that are not in the current page
            if (options.selectable && options.pagination_clear_selection) {
                selectionApplyAll(false, false);
            }

            offset = (pagenum - 1) * options.pagesize;

            if (options.paginationOnClient) {
                $scope.list.records         = flexiListService.pageDataset($scope.list.client_ds, offset, options.pagesize, options.log);
                $scope.list.pagination_info = flexiListService.getPagination(ds_length, offset, options.pagesize, options.pages);
                $scope.$emit('flComplete', {result: 'OK'});
            } else {
                loadData();
            }
        }

        //************************************************************
        // Data load
        //************************************************************

        function loadInlineData() {
            options.paginationOnClient = true;
            options.sortOnClient       = true;
            options.searchOnClient     = true;

            $scope.list.loadedDS = options.data;

            if (!$scope.list.loadedDS) {
                $scope.list.loadedDS = [];
                if (options.log.err) {
                    $log.log(options.log.id + ' - Load Error.');
                }
            }

            $scope.list.client_ds = flexiListService.processDataset(
                options.data,
                options.where,
                options.orderby,
                options.limit,
                options.log
            );

            ds_length = $scope.list.client_ds.length;

            if (options.pagination) {
                $scope.list.records         = flexiListService.pageDataset($scope.list.client_ds, offset, options.pagesize, options.log);
                $scope.list.pagination_info = flexiListService.getPagination(ds_length, offset, options.pagesize, options.pages);
            } else {
                $scope.list.records = $scope.list.client_ds;
            }

            sorted = transformSorted();
        }

        function processDataset() {
            $scope.list.client_ds = flexiListService.processDataset(
                $scope.list.loadedDS,
                options.where,
                options.orderby,
                options.limit,
                options.log
            );

            ds_length = $scope.list.client_ds.length;

            if (options.pagination) {
                $scope.list.records         = flexiListService.pageDataset($scope.list.client_ds, offset, options.pagesize, options.log);
                $scope.list.pagination_info = flexiListService.getPagination(ds_length, offset, options.pagesize, options.pages);
            } else {
                $scope.list.records = $scope.list.client_ds;
            }
        }

        function loadJsonFile() {
            options.paginationOnClient = true;
            options.sortOnClient       = true;
            options.searchOnClient     = true;

            var promise = flexiListService.requestJsonFile(options.jsonFile);

            promise.then(
                function(data) {

                    if (options.log.debug) {
                        $log.log(options.log.id + ' - Data: ' + $filter('json')(data));
                    }

                    if (!data) {
                        data = [];
                    }

                    $scope.list.loadedDS = data;
                    processDataset();
                    sorted               = transformSorted();

                    $scope.$emit('flComplete', {result: 'OK'});
                },
                function(reason) {
                    if (options.log.err) {
                        $log.log(options.log.id + ' - Load Error: ' + reason);
                    }

                    $scope.list.loadedDS = [];
                    $scope.list.records  = [];
                    $scope.$emit('flComplete', {result: 'ERROR', message: reason});
                }
            );
        }

        function loadFromServer() {
            var ajax = flexiListService.requestServer(options, offset);

            ajax.then(
                function(data) {

                    $scope.list.server_response = data;
                    if (options.log.debug) {
                        $log.log(options.log.id + ' - Data: ' + $filter('json')(data));
                    }

                    if (!data) {
                        data = {};
                    } else {
                        if (data.result !== 'OK') {
                            if (options.log.err) {
                                $log.log(options.log.id + ' - data.result: ' + data.result);
                            }
                        }
                    }

                    if (!data.records) {
                        data.records = [];
                    }

                    $scope.list.loadedDS = data.records;

                    // Follow the server response if a where clause is informed
                    if (data.where) {
                        options.where = data.where;
                    }

                    // Follow the server response if an orderby clause is informed
                    if (data.orderby) {
                        setOrderby(data.orderby);
                    }
                    else {
                        sorted = transformSorted();
                    }

                    // Follow the server response if a rowcount is informed (it should be informed)
                    if (data.rowcount) {
                        ds_length = data.rowcount;
                    } else {
                        ds_length = data.records.length;
                    }

                    $scope.list.client_ds = data.records;

                    if (options.searchable && options.searchOnClient) {
                        $scope.list.client_ds = flexiListService.filterDataset($scope.list.client_ds, options.where, options.log);
                        ds_length             = $scope.list.client_ds.length;
                    }

                    if (options.sortable && options.sortOnClient) {
                        $scope.list.client_ds = flexiListService.sortDataset($scope.list.client_ds, options.orderby, options.log);
                    }

                    if (options.pagination) {
                        if (options.paginationOnClient) {
                            $scope.list.records         = flexiListService.pageDataset($scope.list.client_ds, offset, options.pagesize, options.log);
                            $scope.list.pagination_info = flexiListService.getPagination(ds_length, offset, options.pagesize, options.pages);
                        } else {
                            $scope.list.records = data.records;

                            // Follow the server response if an offset or pagesize is informed
                            var v_offset;

                            if (data.offset) {
                                v_offset = data.offset;
                            }
                            else {
                                v_offset = offset;
                            }

                            if (data.pagesize) {
                                options.pagesize = data.pagesize;
                            }

                            $scope.list.pagination_info = flexiListService.getPagination(ds_length, v_offset, options.pagesize, options.pages);
                        }
                    }
                    else {
                        $scope.list.records = $scope.list.client_ds;
                    }

                    if (data.result != 'OK') {
                        $scope.$emit('flComplete', {result: 'ERROR', message: data.result});
                    } else {
                        $scope.$emit('flComplete', {result: 'OK'});
                    }
                },
                function(reason) {
                    if (options.log.err) {
                        $log.log(options.log.id + ' - Load Error: ' + reason);
                    }

                    $scope.list.loadedDS = [];
                    $scope.list.records  = [];
                    $scope.$emit('flComplete', {result: 'ERROR', message: reason});
                }
            );
        }

        function change(p_options) {
            $scope.$emit('flStartOp', {op: 'change'});
            angular.extend(options, p_options);

            // Unselect all records
            if (options.selectable) {
                selectionApplyAll(false, false);
            }
            // Reset to first page
            offset = 0;

            processDataset();
            sorted = transformSorted();
            $scope.$emit('flComplete', {result: 'OK'});
        }

        function loadData() {
            $scope.$emit('flStartOp', {op: 'loadData'});

            selectedCount = 0;

            if (options.data) {
                loadInlineData();
                $scope.$emit('flComplete', {result: 'OK'});
            } else if (options.jsonFile) {
                loadJsonFile();
            } else if (options.listURL) {
                loadFromServer();
            } else {
                if (options.log.err) {
                    $log.log(options.log.id + ' - Undefined data source.');
                }

                $scope.$emit('flComplete', {result: 'ERROR', message: 'Undefined data source'});
            }

        }

    }

})();
