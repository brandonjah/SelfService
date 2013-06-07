app.controller('BaseInfoCtrl', function($scope, $timeout, $http, $location, saveObject) {
	$scope.bundles = [
	                  "convis",
	                  "denver-org",
	                  "discover-los-angeles",
	                  "san-fran"
	                  ];
	$scope.url = '/info';
	$scope.save = function(siteId) {
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
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	}
	$scope.createNew = function(siteId) {
		$scope.save(siteId);
		saveObject.clear();
		layoutPage(siteId);
	}
	$scope.search = function(siteId) {
	    $http({method: 'GET', url: '/site/'+siteId}).
	    success(function(data, status, headers, config) {
    		  $scope.templateName = data.templateName;
    		  $scope.bgColor = data.bgColor;
    		  $scope.txtColor = data.txtColor;
	    	  $scope.siteId = data.siteId;	    	  
	          $scope.success = true;
	    }).
	    error(function(data, status, headers, config) {
	    	$scope.templateName = "";
	    	$scope.bgColor = "";
	    	$scope.txtColor = "";
	          $scope.success = false;
	    });
	}
	$scope.load = function(siteId) {
	    $http({method: 'GET', url: '/load-layout/'+siteId}).
	    success(function(data, status, headers, config) {
	    	console.log(data);
	    	console.log("data layout in base-info");
	    	console.log(data.layout);
	    	if(data.layout) {
	    		saveObject.update(data.layout);
	    	}
	          $scope.success = true;
	          layoutPage($scope.siteId);
	    }).
	    error(function(data, status, headers, config) {
	    	alert("no layout found for site ID " + siteId);
	          $scope.success = false;
	    });
	}
	var layoutPage = function(siteId) {
		$location.path('/layout/'+siteId);
	}
});