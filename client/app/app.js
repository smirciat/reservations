'use strict';

angular.module('workApp', [
  'workApp.auth',
  'workApp.admin',
  'workApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'ngTouch',
  'ui.grid',
  'ui.grid.cellNav',
  'ui.grid.edit', 
  'ui.grid.rowEdit',
  'ui.grid.selection', 
  'ui.select'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
