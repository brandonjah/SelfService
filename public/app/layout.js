var app = angular.module('Layout', ['ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/layout', {templateUrl: 'assets/app/partials/layout.html', controller: this.layoutCtrl}).
	      otherwise({redirectTo: '/layout'});
	}]);

app.factory('saveObject', function($rootScope) {
		var layout = [];
		var components = [];
		var containers = [];
		
	    var sharedService = {};
	    
	    sharedService.message = '';

	    sharedService.prepForBroadcast = function(msg) {
	        this.message = msg;
	        this.broadcastItem();
	    };

	    sharedService.broadcastItem = function() {
	        $rootScope.$broadcast('handleBroadcast');
	    };

	    return sharedService;
		
	});

//create different factory to save to database which has components, containers, etc in it

app.controller('layoutCtrl', function($scope, saveObject) {
	var layoutCount = 0;
	$scope.containers = [];
	$scope.newObj = {};
	$scope.buttons = [{'name': 'Header'},{'name': 'Product'},{'name': 'Footer'}];
	
	$scope.addContainer = function(name) {
		layoutCount++;
		$scope.containers.push({'id':(name+layoutCount)});
	};
	
	$scope.delComponent = function(item) {
		for (var i = 0; i < $scope.containers.length; i++) {
			if(item.id == $scope.containers[i].id) {
				this.containers.splice(i, 1);
				layoutCount--;
			}
		}
	};
	
    $scope.$on('handleBroadcast', function() {
        console.log('layoutCtrl handling message');
        saveObject.containers = $scope.containers;
    }); 

});

app.controller('contentCtrl', function($scope, saveObject) {
	var componentCount = 0;
	$scope.components = [];

	$scope.delComponent = function(thing) {
		for (var i = 0; i < $scope.components.length; i++) {
			if(thing.id == $scope.components[i].id) {
				this.components.splice(i, 1);
				componentCount--;
			}
		}
	};
	
	$scope.dropCallback = function(event, ui) {
		componentCount++; 
		$scope.components.push({'id':componentCount, 'class' : ui.helper.context.className, 'container':$scope.item.id});
	};
	
    $scope.$on('handleBroadcast', function() {
    	console.log('contentCtrl handling message');
    	saveObject.components = $scope.components;
    }); 
});

app.controller('productCtrl', function($scope) {
	$scope.startcomponents = [{'class': 'componentWdgt'},{'class': 'componentImg'},{'class': 'componentTxt'}];
});

app.controller('submitCtrl', function($scope, saveObject) {
	$scope.saveLayout = function() {
		saveObject.prepForBroadcast();
//		http://jsfiddle.net/simpulton/XqDxG/
	};
});