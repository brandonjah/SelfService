var app = angular.module('Layout', ['ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/layout', {templateUrl: 'assets/app/partials/layout.html', controller: this.layoutCtrl}).
	      otherwise({redirectTo: '/layout'});
	}]);

app.controller('layoutCtrl', function($scope) {
	var layoutCount = 0;
	$scope.drop = {};
	$scope.drop.containers = [];
	$scope.newObj = {};
	$scope.buttons = [{'name': 'Header'},{'name': 'Product'},{'name': 'Footer'}];
	
	$scope.addContainer = function(name) {
		layoutCount++;
		$scope.drop.containers.push({'id':(name+layoutCount)});
		console.log('container:');
		console.log($scope.drop.containers);
	};
	
});

app.controller('contentCtrl', function($scope) {
	var layoutCount = 0;
	$scope.content = {};
	$scope.content.components = [];
	
	$scope.dropCallback = function(event, ui) {
		$scope.content.components.push({'class' : ui.helper.context.className,'container':$scope.item.id});
		console.log('component:');
		console.log($scope.content.components);
	};
});

app.controller('productCtrl', function($scope) {
	$scope.startcomponents = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];
});