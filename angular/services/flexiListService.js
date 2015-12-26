/**
 * Created by anonymous on 26/12/15 15:10.
 */

/**
 * @ngdoc service
 * @name flexiListService
 * @private
 * @description
 *   Provides functions to:
 *        - Load data from server.
 *    - Load data from a JSON file.
 *        - Sort, filter, limit and page the dataset.
 */
(function() {
    'use strict';

    angular
        .module('flexiList')
        .factory('flexiListService', flexiListService);

    flexiListService.$inject = ['$q', '$http', '$log', '$filter'];

    /* @ngInject */
    function flexiListService($q, $http, $log, $filter) {
        var service = {
            requestJsonFile: requestJsonFile,
            requestServer  : requestServer,
            sortDataset    : sortDataset,
            filterDataset  : filterDataset,
            processDataset : processDataset,
            pageDataset    : pageDataset,
            getPagination  : getPagination
        };

        return service;

        ////////////////

        function requestJsonFile(jsonFile) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url   : jsonFile
            }).success(function(data, status) {
                deferred.resolve(data);
            }).error(function(data, status) {
                deferred.reject('ERROR: ' + status);
            });

            return deferred.promise;
        }

        function requestServer(options, offset) {
            var deferred = $q.defer();

            var post_data = {};

            if (options.limit) {
                post_data.limit = options.limit;
            }

            if (options.searchable && !options.searchOnClient) {
                post_data.where = options.where;
            }

            if (options.sortable && !options.sortOnClient) {
                post_data.orderby = options.orderby;
            }

            if (options.pagination && !options.paginationOnClient) {
                post_data.offset   = offset;
                post_data.pagesize = options.pagesize;
            }

            if (options.urlencoded) {
                if (options.method == 'GET') {
                    //var v_url = options.listURL + '?' + jQuery.param(post_data);
                    var v_url = options.listURL;
                    if (options.log.debug) {
                        $log.log(options.log.id + ' URL: ' + v_url);
                    }

                    $http({
                        method: 'GET',
                        url   : v_url
                        /*
                         //Does not work as expected
                         params: post_data,
                         paramSerializer: '$httpParamSerializerJQLike'
                         */
                    }).success(function(data, status) {
                        deferred.resolve(data);
                    }).error(function(data, status) {
                        deferred.reject('ERROR: ' + status);
                    });

                } else {
                    $http({
                        method : 'POST',
                        url    : options.listURL,
                        data   : jQuery.param(post_data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        /*
                         //Does not work as expected
                         params: post_data,
                         paramSerializer: '$httpParamSerializerJQLike'
                         */
                    }).success(function(data, status) {
                        deferred.resolve(data);
                    }).error(function(data, status) {
                        deferred.reject('ERROR: ' + status);
                    });
                }
            } else {
                if (options.method == 'GET') {
                    $http({
                        method: 'GET',
                        url   : options.listURL,
                        params: post_data
                    }).success(function(data, status) {
                        deferred.resolve(data);
                    }).error(function(data, status) {
                        deferred.reject('ERROR: ' + status);
                    });
                } else {
                    $http.post(options.listURL, post_data)
                        .success(function(data, status) {
                            deferred.resolve(data);
                        }).error(function(data, status) {
                            deferred.reject('ERROR: ' + status);
                        });
                }
            }

            return deferred.promise;
        }

        function sortDataset(dataset, orderby, log) {
            var sorted_ds = [];

            // Sort
            // TODO: nested sorts
            if (orderby[0]) {
                var reverse = (orderby[0].type == 'desc');
                sorted_ds   = $filter('orderBy')(dataset, orderby[0].field, reverse);
            } else {
                sorted_ds = dataset;
            }

            return sorted_ds;
        }

        // Filter the dataset
        function filterDataset(dataset, where, log) {
            var filtered_ds = [];
            var field;
            var value;
            var condition;
            var pattern;
            var options;
            var passed;

            // Where
            if (where.length) {
                for (var i = 0; i < dataset.length; i++) {
                    passed = true;

                    for (var j = 0; j < where.length; j++) {
                        field     = where[j].field;
                        value     = dataset[i][field];
                        condition = where[j].condition;
                        pattern   = where[j].value;
                        options   = where[j].options;

                        if (!field) continue;
                        if (!condition) continue;
                        //if (! pattern) continue;
                        //if (! value) continue;

                        try {
                            passed = $filter(condition)(value, pattern, options);
                        } catch (e) {
                            if (log.err) {
                                $log.log(log.id + ' - flexiListService: filter exception at ', e);
                            }

                            passed = true;
                        }

                        if (log.debug) {
                            $log.log(log.id + ' - filterDataset: value=' + value + ' condition=' + condition + ' pattern=' + pattern + ' passed=' + passed);
                        }

                        if (!passed) break;
                    }

                    if (passed) {
                        filtered_ds.push(dataset[i]);
                    }
                }
            } else {
                filtered_ds = dataset;
            }

            return filtered_ds;
        }

        function processDataset(dataset, where, orderby, limit, log) {
            var filtered_ds = this.filterDataset(dataset, where, log);
            var ordered_ds  = this.sortDataset(filtered_ds, orderby, log);
            var limited_ds  = $filter('limitTo')(ordered_ds, limit);

            return limited_ds;
        }

        function pageDataset(dataset, offset, pagesize, log) {
            var page_ds = [];
            var lastrec = offset + pagesize;

            if (lastrec > dataset.length) {
                lastrec = dataset.length;
            }

            for (var i = offset; i < lastrec; i++) {
                page_ds.push(dataset[i]);
            }

            return page_ds;
        }

        function getPagination(rowcount, offset, pagesize, show_pages) {
            var pagination = {};
            var currpage   = (offset / pagesize) + 1;
            var maxpage    = Math.ceil(rowcount / pagesize);
            var firstpage  = currpage - 2;

            if (firstpage < 1) {
                firstpage = 1;
            }

            var lastpage = firstpage + show_pages - 1;

            var overflow = lastpage - maxpage;

            if (overflow > 0) {
                lastpage  = maxpage;
                firstpage = firstpage - overflow;

                if (firstpage < 1) {
                    firstpage = 1;
                }
            }

            var firstrec = ((currpage - 1) * pagesize) + 1;
            var lastrec  = currpage * pagesize;

            if (lastrec > rowcount) {
                lastrec = rowcount;
            }

            var pages = [];

            for (var i = firstpage; i <= lastpage; i++) {
                pages.push(i);
            }

            pagination.firstrec   = firstrec;
            pagination.lastrec    = lastrec;
            pagination.rowcount   = rowcount;
            pagination.currpage   = currpage;
            pagination.lastpage   = lastpage;
            pagination.pages      = pages;
            pagination.totalpages = maxpage;
            pagination.show_pages = show_pages;
            pagination.pagesize   = pagesize;

            return pagination;
        }
    }

})();

