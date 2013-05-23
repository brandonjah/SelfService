var app = angular.module('LandingPage', ['ngDragDrop','ui.bootstrap','colorpicker.module', 'ngUpload']);

app.config(['$routeProvider', '$httpProvider',
    function($routeProvider) {
	  $routeProvider.
	      when('/layout/:siteId', {templateUrl: 'assets/app/partials/layout.html', controller: this.containerCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: this.BaseInfoCtrl}).
	      when('/upload', {templateUrl: 'assets/app/partials/upload.html', controller: this.UploadCtrl}).
	      otherwise({redirectTo: '/info'});
	}
]);

app.controller('UploadCtrl', function($scope) {
	//File Uploader
	$scope.results = function(content, completed) {
	      if (completed && content.length > 0) {
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