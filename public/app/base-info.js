'use strict';

app.controller('BaseInfoCtrl', function($scope, $timeout, $http, $location) {
	$scope.url = '/info';
	$scope.save = function() {
		$http.post($scope.url, { 
			"siteId" : $scope.siteId,
			"templateName" : $scope.templateName,
			"bgColor" : $scope.bgColor,
			"txtColor" : $scope.txtColor
			}).
	      success(function(data){
	    	  console.log('in success');
	    	  console.log(data);
	          $scope.success = true;
	          $location.path('/layout/'+$scope.siteId);
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	}
});

