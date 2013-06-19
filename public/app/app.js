var app = angular.module('LandingPage', ['ngDragDrop','ui.bootstrap','colorpicker.module', 'ngUpload', 'ui.sortable']);

app.config(['$routeProvider', '$httpProvider',
    function($routeProvider) {
	  $routeProvider.
	      when('/layout/:bundleId', {templateUrl: 'assets/app/partials/layout.html', controller: this.containerCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: this.BaseInfoCtrl}).
	      when('/upload', {templateUrl: 'assets/app/partials/upload.html', controller: this.UploadCtrl}).
	      when('/preview', {templateUrl: 'assets/app/partials/preview.html', controller: this.PreviewCtrl}).
	      when('/generate/:bundleId', {templateUrl: 'assets/app/partials/generate.html', controller: this.GenerateCtrl}).
	      otherwise({redirectTo: '/info'});
	}
]);

app.controller('UploadCtrl', function($scope) {
	//File Uploader
	$scope.results = function(content, completed) {
	      if (completed/* && content.length > 0*/) {
	    	  console.log('completed and content on file upload');
	    	  console.log(content); // process content
	      } else {
	    	  console.log('failed check in file upload');
	    	  console.log(content);
	        // 1. ignore content and adjust your model to show/hide UI snippets; or
	        // 2. show content as an _operation progress_ information
	      }
	    }
});

app.controller('ListUploadsCtrl', function($scope,$http) {
	$scope.listFiles = function() {
		$http({method: 'GET', url: '/list-uploads'}).
	    success(function(data, status, headers, config) {
	    	console.log(data);
	          $scope.success = true;
	    }).
	    error(function(data, status, headers, config) {
	          $scope.success = false;
	    });
	};
});