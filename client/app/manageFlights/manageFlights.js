'use strict';

angular.module('workApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/manageFlights', {
        templateUrl: 'app/manageFlights/manageFlights.html',
        controller: 'ManageFlightsCtrl'
      });
  });
