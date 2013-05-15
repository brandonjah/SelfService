var app = angular.module('LandingPage', ['ngDragDrop','ui.bootstrap','colorpicker.module', 'blueimp.fileupload']);

app.config(['$routeProvider', '$httpProvider', 'fileUploadProvider',
    function($routeProvider) {
	  $routeProvider.
	      when('/layout/:siteId', {templateUrl: 'assets/app/partials/layout.html', controller: this.containerCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: this.BaseInfoCtrl}).
	      otherwise({redirectTo: '/info'});
	}
]);
