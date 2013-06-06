app.controller('containerCtrl', function($scope, saveObject) {
	$scope.containers = saveObject.getLayout();
	$scope.newObj = {};
	
	$scope.addContainer = function(name) {
		saveObject.updateContainers(name, 'add');
	};
});

app.controller('componentCtrl', function($scope, $dialog, saveObject) {
	var componentWidth = "Third";
	
	$scope.delComponent = function(thing) {
		saveObject.updateComponents('del', thing.className, thing.id, thing.container, null);
	};
	
	$scope.dropCallback = function(event, ui) {
		saveObject.updateComponents('add', ui.helper.context.className, $scope.item.id, null, componentWidth);
	};
});

function CollapseCtrl($scope) {
	  $scope.isCollapsed = true;
	}

app.controller('submitCtrl', function($scope, $http, $location, saveObject) {
	$scope.url = '/save-layout';
	$scope.saveLayout = function() {
		saveObject.logContents();
		var containers = saveObject.getLayout();
		var siteId = saveObject.getSiteId();

		console.log('containers');
		console.log(containers);
			$http.post($scope.url, {
				"siteId" : siteId,
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
		$http.post('/generate', {}).
	      success(function(data){
	    	  console.log('in generate success');
	          $scope.success = true;
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	};
});

app.controller('PreviewCtrl', function($scope, saveObject) {
	
});