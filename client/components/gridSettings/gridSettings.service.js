'use strict';

angular.module('workApp')
  .factory('gridSettings', function (uiGridConstants, $http) {
    var flightDate;
    var flightHour;
    var params={};
    //flights api options within an bject
    params.flight = {
      gridOptions: {
        rowEditWaitInterval: 0,
        enableCellEditOnFocus: true,
        columnDefs: [
          { name: ' ', cellTemplate: '<div><button type="button" id="removeRow"  ng-click="grid.appScope.removeRow(row)">X</button></div>', width:27 },
          { name: 'hourOfDay'},
          { name: 'number', displayName:'Flight Number', sort: {
                direction: uiGridConstants.ASC, priority: 1  }},
          { name: 'date', displayName:'Flight Date', type:'date', sort: {
                direction: uiGridConstants.ASC, priority: 0 }, 
                cellFilter: 'date:"MM/dd/yyyy"' },
          { name: 'pilot'},
          { name: 'aircraft'} 
        ],
        data : [] 
      },
      
      newRecord: { number: 'fltNum', date:new Date(), pilot:'pilot', aircraft:  'aircraft' 
      },
      
      preSave: ['date'] ,
      
      processAfterGet: function(data){return data;}
      
    };

    params.reservation = {
      gridOptions:{
      rowEditWaitInterval: 0,
      enableCellEditOnFocus: true,
      columnDefs: [
          { name: ' ', cellTemplate: '<div><button type="button" id="removeRow"  ng-click="grid.appScope.removeRow(row)">X</button></div>', width:27 },
          { name: 'name' },
          { name: 'customerId'}, 
          { name: 'Flight Number', field: 'flightId.value', editModelField: 'flightId', 
             editDropdownOptionsArray: [], editableCellTemplate: '<ui-select-wrap><ui-select ng-model="MODEL_COL_FIELD" theme="selectize" ng-disabled="disabled" append-to-body="true"><ui-select-match placeholder="Choose...">{{ COL_FIELD }}</ui-select-match><ui-select-choices repeat="item in col.colDef.editDropdownOptionsArray | filter: $select.search" refresh="grid.appScope.refreshOptions()"><span>{{ item.value }}</span></ui-select-choices></ui-select></ui-select-wrap>' },
          { name: 'hourOfDay'},
          { name: 'date' , type: 'date', cellFilter: 'date:"MM/dd/yyyy"'},
          { name: 'weight'},
          { name: 'freightWeight'},
          { name: 'Travel Code', field: 'travelCodeId.value', editModelField: 'travelCodeId', 
             editDropdownOptionsArray: [], editableCellTemplate: '<ui-select-wrap><ui-select ng-model="MODEL_COL_FIELD" theme="selectize" ng-disabled="disabled" append-to-body="true"><ui-select-match placeholder="Choose...">{{ COL_FIELD }}</ui-select-match><ui-select-choices repeat="item in col.colDef.editDropdownOptionsArray | filter: $select.search" refresh="grid.appScope.refreshOptions()"><span>{{ item.value }}</span></ui-select-choices></ui-select></ui-select-wrap>' },
          { name: 'dateReserved', type: 'date', cellFilter: 'date:"MM/dd/yyyy"'},
          { name: 'dateModified', type: 'date', cellFilter: 'date:"MM/dd/yyyy"'}
      ],
      data : [] },
      
      newRecord: {
          name: 'name' ,
          customerId: 'customerId',
          flightId: 'flightId',
          hourOfDay: 8,
          date : new Date(),
          weight : 0,
          freightWeight: 0,
          travelCodeId: 'travCodeId',
          dateReserved: new Date(),
          dateModified: new Date()
      },
      
      preSave: ['date','dateModified','dateReserved'],
      
      processAfterGet: function(data){
        data.forEach(function(d){
          if (d.travelCodeId) d.travelCodeId.value = d.travelCodeId.code;
          if (d.flightId) d.flightId.value = d.flightId.number;
        });
        return data;
        
      }
      
    };
    
    params.travelCode = {
      gridOptions: {
        rowEditWaitInterval: 0,
        enableCellEditOnFocus: true,
        columnDefs: [
          { name: ' ', cellTemplate: '<div><button type="button" id="removeRow" ng-click="grid.appScope.removeRow(row)">X</button></div>', width:27 },
          { name: 'code', displayName:'Travel Code' },
          { name: 'depart', displayName:'Departure Location' },
          { name: 'arrive', displayName:'Arrival Location' },
          { name: 'index', displayName:'Index', type:'number', sort: {
                direction: uiGridConstants.ASC, priority: 0} 
          }
        ],
        data : [] 
        
      },
      
      newRecord: {
          code:'travel code',depart:'depart', arrive:'arrive', index: 0 
      },
      
      preSave: [],
      
      processAfterGet: function(data){return data;}
      
    };
    
    $http.get('/api/travelCode').success(function(data){
      var max=0;
      data.forEach(function(d){
        if (d.index>max) max=d.index;
      });
      
      params.travelCodes.newRecord={
          code:'travel code',depart:'depart', arrive:'arrive', index: max+1
      };
    });
    
    return {
      get: function(apiName){
        return params[apiName];
      },
      
      getNew: function(apiName){
        return params[apiName].newRecord;
      },
      
      getFun: function(apiName, data){
        return params[apiName].processAfterGet(data);
      },
      
      setCriteria: function(date, hour){
        flightDate=date;
        flightHour=hour;
      },

      testItem: function(item){
        if (flightDate&&item.date){
          var date=flightDate;
          date = new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0); 
          var endDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),23,59,59);
          if (item.date<date||item.date>endDate) return false;
        } 
        if (flightHour&&flightHour!==item.hourOfDay) return false;
        return true;
      },
      
      getQuery: function(){
        var queryString="";
        if (flightDate) queryString+="date="+flightDate;
        if (flightHour) queryString+="&hourOfDay="+flightHour;
        return queryString;
      }
      
    };
  });
