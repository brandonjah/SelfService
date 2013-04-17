app.controller('BaseInfoCtrl', function($scope, $timeout, $http) {
	$scope.url = '/info';
	$scope.save = function() {
		$http.post($scope.url, { 
			"siteId" : $scope.siteId,
			"templateName" : $scope.templateName
			}).
	      success(function(data){
	          $scope.success = true;
	          $scope.msg = {};
	          redirectTo: '/layout/'+$scope.siteId;
	        }).
	        error(function(data){
	          $scope.httpError = true;
	        });
	}
});