'use strict';

describe('Controller: ManageFlightsCtrl', function () {

  // load the controller's module
  beforeEach(module('workApp'));

  var ManageFlightsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageFlightsCtrl = $controller('ManageFlightsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
