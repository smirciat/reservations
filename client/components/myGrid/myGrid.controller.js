'use strict';

angular.module('workApp')
  .controller('MyGridCtrl', function ($scope, $http, $interval, $q, uiGridConstants) {
    
    $scope.gridOptions={
      rowEditWaitInterval: 0,
      columnDefs: [
          { name: 'number', displayName:'Flight Number', sort: {
                direction: uiGridConstants.ASC, priority: 1  }},
          { name: 'date', displayName:'Flight Date', type:'date', sort: {
                direction: uiGridConstants.ASC, priority: 0 }, 
                cellFilter: 'date:"MM/dd/yyyy"' },
          { name: 'pilot'},
          { name: 'aircraft'} 
      ],
      data : [] };
    
    $scope.addData = function(){
      $scope.gridOptions.data.push({
        number: 'fltNum', date:new Date(), pilot:'pilot', aircraft:  'aircraft' 
      });
    };
    
    $scope.removeRow = function() {
       if ($scope.selectedRowId.isSelected) {
         $scope.selectedRowId.isSelected=false;
         if ($scope.selectedRowId.entity._id) $http.delete('/api/flights/' + $scope.selectedRowId.entity._id);
         for (var i=0;i<$scope.gridOptions.data.length;i++){
           if ($scope.gridOptions.data[i]._id===$scope.selectedRowId.entity._id) {
             $scope.gridOptions.data.splice(i,1);
             i=$scope.gridOptions.data.length+2;
           }
         } 
       } 
    };
    $scope.saveRow = function( rowEntity ) {
      var promise;
      rowEntity.date=new Date(rowEntity.date);
      if (rowEntity._id) promise = $http.put('/api/flights/'+rowEntity._id, rowEntity);
      else promise = $http.post('/api/flights/', rowEntity);
      $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise );
    };
    $scope.gridOptions.multiSelect=false;
    $scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
      $scope.gridApi.selection.setMultiSelect=false;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.selectedRowId=row;
      });
    };
    $scope.selectedRowId = {};
    $http.get('/api/flights').success(function(tCodes){
      $scope.gridOptions.data=tCodes;
    });

    
  });
