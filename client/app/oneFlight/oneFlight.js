'use strict';

angular.module('workApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/oneFlight', {
        templateUrl: 'app/oneFlight/oneFlight.html',
        controller: 'OneFlightCtrl'
      });
  });
