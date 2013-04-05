var app = angular.module('Layout', ['ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/layout', {templateUrl: 'assets/app/partials/layout.html', controller: this.layoutCtrl}).
	      otherwise({redirectTo: '/layout'});
	}]);

app.controller('layoutCtrl', function($scope) {
	var layoutCount = 0;
	$scope.containers = [];
	$scope.newObj = {};
	$scope.buttons = [{'name': 'Header'},{'name': 'Product'},{'name': 'Footer'}];
	
	$scope.addContainer = function(name) {
		layoutCount++;
		$scope.containers.push({'id':(name+layoutCount)});
	};

});

app.controller('contentCtrl', function($scope) {
	var layoutCount = 0;
	$scope.components = [];

	$scope.delComponent = function(thing) {
		for (var i = 0; i < $scope.components.length; i++) {
			if(thing.container == $scope.components[i].container) {
				console.log('before');
				console.log($scope.components);
				$scope.components.splice(i, 1);
				console.log('after');
				console.log($scope.components);
			}
		}
		
	};
	
	$scope.dropCallback = function(event, ui) {
		$scope.components.push({'class' : ui.helper.context.className,'container':$scope.item.id});
	};
});

app.controller('productCtrl', function($scope) {
	$scope.startcomponents = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];
});