app.controller('BaseInfoCtrl', function($scope, $timeout, $http, $location) {
	$scope.url = '/info';
	$scope.submit = function() {
//		https://github.com/blueimp/jQuery-File-Upload/wiki/API
//		https://github.com/blueimp/jQuery-File-Upload/wiki/Options
//		https://github.com/blueimp/jQuery-File-Upload/wiki
		alert('not yet implemented');
	}
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
	$scope.search = function() {
	    $http({method: 'GET', url: '/site/'+$scope.siteId}).
	    success(function(data, status, headers, config) {
	    	  console.log('sending site id, success');
	    	  console.log(data.templateName.toString());
	          $scope.success = true;
	    }).
	    error(function(data, status, headers, config) {
	    	  console.log('sending site id, error');
	    	  console.log(data);
	          $scope.success = false;
	    });
	}
});