app.controller('BaseInfoCtrl', function($scope, $timeout, $http, $location, saveObject) {
	$scope.bundles = [
	                  "convis",
	                  "denver-org",
	                  "discover-los-angeles",
	                  "san-fran"
	                  ];
	$scope.url = '/info';
	$scope.save = function(bundleId) {
		$http.post($scope.url, { 
			"bundleId" : $scope.bundleId,
			"templateName" : $scope.templateName,
			"bgColor" : $scope.bgColor,
			"txtColor" : $scope.txtColor
			}).
	      success(function(data){
	    	  console.log('in success');
	    	  console.log(data);
	          $scope.success = true;
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	}
	$scope.createNew = function(bundleId) {
		$scope.save(bundleId);
		saveObject.clear();
		layoutPage(bundleId);
	}
	$scope.search = function(bundleId) {
	    $http({method: 'GET', url: '/site/'+bundleId}).
	    success(function(data, status, headers, config) {
    		  $scope.templateName = data.templateName;
    		  $scope.bgColor = data.bgColor;
    		  $scope.txtColor = data.txtColor;
	    	  $scope.bundleId = data.bundleId;
	    	  $scope.googleAnalytics = data.googleAnalytics;
	    	  $scope.clientURL = data.clientURL;	    	  
	          $scope.success = true;
	    }).
	    error(function(data, status, headers, config) {
	    	$scope.templateName = "";
	    	$scope.bgColor = "";
	    	$scope.txtColor = "";
	          $scope.success = false;
	    });
	}
	$scope.load = function(bundleId) {
	    $http({method: 'GET', url: '/load-layout/'+bundleId}).
	    success(function(data, status, headers, config) {
	    	console.log(data);
	    	console.log("data layout in base-info");
	    	console.log(data.layout);
	    	if(data.layout) {
	    		saveObject.update(data.layout);
	    	}
	          $scope.success = true;
	          layoutPage($scope.bundleId);
	    }).
	    error(function(data, status, headers, config) {
	    	alert("no layout found for bundle ID " + bundleId);
	          $scope.success = false;
	    });
	}
	var layoutPage = function(bundleId) {
		$location.path('/layout/'+bundleId);
	}
});