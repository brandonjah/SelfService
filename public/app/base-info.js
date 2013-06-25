app.controller('BaseInfoCtrl', function($scope, $timeout, $http, $location, saveObject) {
	$scope.bundles = [
	                  "convis",
	                  "denver-org",
	                  "discover-los-angeles",
	                  "legoland",
	                  "san-fran",
	                  "podunkville"
	                  ];
	$scope.url = '/info';
	$scope.save = function(bundleId) {
		$http.post($scope.url, { 
			"bundleId" : $scope.bundle.bundleId,
			"bgColor" : $scope.bundle.bgColor,
			"txtColor" : $scope.bundle.txtColor,
			"googleAnalytics" : $scope.bundle.googleAnalytics,
			"clientURL" : $scope.bundle.clientURL
			}).
	      success(function(data){
	          $scope.success = true;
	          saveObject.saveBundleInfo($scope.bundle);
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
    		  $scope.bundle.bgColor = data.bgColor;
    		  $scope.bundle.txtColor = data.txtColor;
	    	  $scope.bundle.bundleId = data.bundleId;
	    	  $scope.bundle.googleAnalytics = data.googleAnalytics;
	    	  $scope.bundle.clientURL = data.clientURL;	    	  
	          $scope.success = true;
	    }).
	    error(function(data, status, headers, config) {
	    	  $scope.bundle = {};
	          $scope.success = false;
	    });
	}
	$scope.load = function(_bundleId) {
	    $http({method: 'GET', url: '/load-layout/'+_bundleId}).
	    success(function(data, status, headers, config) {
	    	if(data.layout) {
	    		saveObject.update(data.layout);
	    	}
	          $scope.success = true;
	          layoutPage($scope.bundle.bundleId);
	    }).
	    error(function(data, status, headers, config) {
	    	alert("no layout found for bundle ID " + _bundleId);
	          $scope.success = false;
	    });
	}
	var layoutPage = function(_bundleId) {
		$location.path('/layout/'+_bundleId);
	}
});