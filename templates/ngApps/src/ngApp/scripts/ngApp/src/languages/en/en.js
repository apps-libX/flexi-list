/**
 * Created by <%= author_username %> on <%= dateTime.now %>.
 */

// <%= package_name_cc %>
angular.module('<%= author_username_cc %>.<%= package_name_cc %>').config(['$translateProvider', function ($translateProvider) {
    'use strict';
    $translateProvider.translations('en', {
        TITLE : 'Hello',
        FOO   : 'This is a paragraph.'
    });
    // $translateProvider.preferredLanguage('en');
}]);

//<%= package_name_cc %>
//  .controller('Ctrl', function ($scope, $translate) {
//      $scope.changeLanguage = function (key) {
//          $translate.use(key);
//      };
//  });

// <h1>{{ 'TITLE' | translate }}</h1>
// <p>{{ 'FOO' | translate }}</p>