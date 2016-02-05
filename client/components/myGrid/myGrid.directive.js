'use strict';

angular.module('workApp')
  .directive('myGrid', function ($http, uiGridConstants, gridSettings, socket, $q) {
  return {
    templateUrl: 'components/myGrid/myGrid.html',
    restrict: 'E',
    replace: true,
    scope: {
      myApi:'@'
    },
    link: function (scope, element, attrs ) {
      
    scope.gridOptions = gridSettings.get(scope.myApi).gridOptions;
    
    scope.addData = function(){
      var object = angular.copy(gridSettings.get(scope.myApi).newRecord);
      scope.gridOptions.data.push(object);
    };
    
    scope.removeRow = function(row) {
         if (row.entity._id) $http.delete('/api/' + scope.myApi + '/' + row.entity._id);
         for (var i=0;i<scope.gridOptions.data.length;i++){
           if (scope.gridOptions.data[i]._id===row.entity._id) {
             scope.gridOptions.data.splice(i,1);
             break;
           }
         } 
    };
    scope.index=0;
    scope.saveRow = function( rowEntity ) {
      var promise;
      scope.index = scope.gridOptions.data.indexOf(rowEntity);
      rowEntity.dateModified = new Date();
      var preSave = gridSettings.get(scope.myApi).preSave;
      preSave.forEach(function(element){
        rowEntity[element] = new Date(rowEntity[element]);
      });
      if (rowEntity.flightId==="flightId") rowEntity.flightId=undefined;
      if (rowEntity._id) promise = $http.put('/api/' + scope.myApi + '/'+rowEntity._id, rowEntity);
      else promise = $http.post('/api/' + scope.myApi + '/', rowEntity).success(function(res){
        rowEntity._id=res._id;
        scope.addData();
      });
      scope.gridApi.rowEdit.setSavePromise( rowEntity, promise );
      scope.gridOptions.data.splice(scope.index,1);
    };
    
    scope.gridOptions.multiSelect=false;
    
    scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
      scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow(scope, scope.saveRow);
    };

    scope.refreshOptions = function(){
      if (scope.myApi==="reservations"){
        $http.get('/api/travelCodes').success(function(data){
          data.forEach(function(d){
            d.value=d.code;
          });
          scope.gridOptions.columnDefs[8].editDropdownOptionsArray= data;
        });
        
        $http.get('/api/flights' + '?date=' + scope.rowDate()).success(function(data){
          data.forEach(function(d){
            d.value=d.number;
          });
          scope.gridOptions.columnDefs[3].editDropdownOptionsArray= data;
          
        });
      }
    };
    
    scope.selectedRow={};
    
    scope.rowDate = function(){
      return new Date(scope.selectedRow.entity.date);
    };
    
    var tempDate=new Date(2015,7,5,0,0,0,0); 
    scope.query = "date=" + tempDate + "&hourOfDay=9";
    gridSettings.setCriteria(tempDate,9);
    scope.query = gridSettings.getQuery();
    if (scope.myApi!=="reservations") scope.query="";
    
    scope.getData = function(query){
      $http.get('/api/' + scope.myApi + '?' + query).success(function(data){
        data = gridSettings.getFun(scope.myApi,data);
        scope.gridOptions.data=data;
        scope.addData();
        var shortApi = scope.myApi.substr(0,scope.myApi.length-1);
        
        socket.syncUpdates(shortApi,  scope.gridOptions.data, function(event, item, array){
          if (event==='deleted') return;
          if (scope.myApi==='reservations'){
            //get added item out of array since its not populated
            var index = array.indexOf(item);
            array.splice(index,1);
            if (event==="updated"&&index>0) scope.index=index-1;
            //test if item passes scope.query, if so, bring it correctly
            if (gridSettings.testItem(item)) {
              var promises = [];
              if (item.flightId&&item.flightId!=="flightId") promises.push($http.get('/api/flights/' + item.flightId ).success(function(data){
                data.value=data.number;
                item.flightId=data;
              }));
              if (item.travelCodeId&&item.flightId!=="travelCodeId") promises.push($http.get('/api/travelcodes/' + item.travelCodeId ).success(function(data){
                data.value=data.code;
                item.travelCodeId=data;
              }));
              $q.all(promises).then(function(){
                console.log(item);
                array.splice(scope.index,0,item);
              });
            }
          }
        });
      });  
    };
    
    scope.$on('$destroy', function () {
      socket.unsyncUpdates(scope.myApi);
    });
    
    scope.getData(scope.query);
    
    
   }
  };
  });
