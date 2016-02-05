'use strict';

angular.module('workApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      { 'title': 'Home',
        'link': '/'}, 
      { 'title': 'Manage Flights',
        'link': '/manageFlights'},
      { 'title': 'Manage Travel Codes',
        'link': '/manageTravelCodes'}  
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

