var app = angular.module('LandingPage', ['ngDragDrop','ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/layout/:siteId', {templateUrl: 'assets/app/partials/layout.html', controller: this.containerCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: this.BaseInfoCtrl}).
	      otherwise({redirectTo: '/info'});
	}]);
