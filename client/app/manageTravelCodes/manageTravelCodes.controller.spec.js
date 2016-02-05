'use strict';

describe('Controller: ManageTravelCodesCtrl', function () {

  // load the controller's module
  beforeEach(module('workApp'));

  var ManageTravelCodesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageTravelCodesCtrl = $controller('ManageTravelCodesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
