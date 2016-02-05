'use strict';

angular.module('workApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/manageTravelCodes', {
        templateUrl: 'app/manageTravelCodes/manageTravelCodes.html',
        controller: 'ManageTravelCodesCtrl'
      });
  });
