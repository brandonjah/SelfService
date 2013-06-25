app.controller('containerCtrl', function($scope, saveObject) {
	$scope.containers = saveObject.getLayout();
	$scope.newObj = {};
	
	$scope.addContainer = function(name) {
		saveObject.updateContainers(name, 'add');
	};
});

function CollapseCtrl($scope) {
	  $scope.isCollapsed = true;
	}

app.controller('submitCtrl', function($scope, $http, $routeParams, $location, saveObject) {
	$scope.url = '/save-layout';
	$scope.saveLayout = function() {
		saveObject.logContents();
		var containers = saveObject.getLayout();
		var bundleId = saveObject.getbundleId();
			$http.post($scope.url, {
				"bundleId" : bundleId,
				"containers" : containers
				}).
		      success(function(data){
		    	  console.log('in submitCtrl success');
		          $scope.success = true;
		        }).
		        error(function(data){
		          $scope.httpError = true;
		        });
			
	};
	$scope.previewLayout = function() {
		$location.path('/preview');
	};
	$scope.generate = function() {
		var bundleId = $routeParams.bundleId;
		$location.path('/generate/'+bundleId);
	};
	$scope.raw = function() {
		var bundleId = $routeParams.bundleId;
		$location.path('/raw/'+bundleId);
	};
});

app.controller('PreviewCtrl', function($scope, saveObject) {
	
});