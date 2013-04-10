var app = angular.module('Layout', ['ngDragDrop']);

app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	      when('/layout', {templateUrl: 'assets/app/partials/layout.html', controller: this.layoutCtrl}).
	      otherwise({redirectTo: '/layout'});
	}]);

app.factory('saveObject', function($rootScope) {
	    var sharedService = {};
	    var dbLayoutObj = [];
    	var layoutCount = 0;
	    
	    sharedService.prepForBroadcast = function() {
	        this.broadcastItem();
	    };
	    
	    sharedService.getLayout = function() {
	    	return dbLayoutObj;
	    };
	    
	    sharedService.updateComponents = function(oper, componentId, className, containerName) {
    		for (var i=0;i<dbLayoutObj.length;i++) {
    			console.log('first');
    			if(containerName == dbLayoutObj[i].id) {
    				if(oper == 'add') {
    					dbLayoutObj[i].components.push({'id':componentId,'className':className});
    				} else if(oper == 'del') {
    					for (var x = 0; x < dbLayoutObj[i].components.length; x++) {
    						if(componentId == dbLayoutObj[i].components[x].id) {
    							dbLayoutObj[i].components.splice(x, 1);
//    							componentCount--;
    						}
    					}
    				}
    			}
    		}
    		console.log('dbLayoutObj in updatecomponents');
    		console.log(dbLayoutObj);
	    };
	    
	    sharedService.updateContainers = function(id, oper) {
	    	if(oper == 'add') {
	    		dbLayoutObj.push({'id':(id+layoutCount),'components':[]});
				layoutCount++;
	    	} else if (oper == 'del') {
	    		for (var i = 0; i < dbLayoutObj.length; i++) {
	    			if(id == dbLayoutObj[i].id) {
	    				dbLayoutObj.splice(i, 1);
	    				layoutCount--;
	    			}
	    		}
	    	}
	    	console.log(dbLayoutObj);
	    };
	   
	    sharedService.broadcastItem = function() {
	        $rootScope.$broadcast('handleBroadcast');
	    };
	    
	    sharedService.logContents = function() {
	    	console.log('dbLayoutObj');
	    	console.log(dbLayoutObj);
	    };

	    return sharedService;
		
	});


app.controller('layoutCtrl', function($scope, saveObject) {
	$scope.containers = saveObject.getLayout();
	$scope.newObj = {};
	$scope.buttons = [{'name': 'Header'},{'name': 'Product'},{'name': 'Footer'}];
	
	$scope.addContainer = function(name) {
		saveObject.updateContainers(name, 'add');
	};
	
	$scope.delContainer = function(item) {
		saveObject.updateContainers(item.id, 'del');
	};
	
    $scope.$on('handleBroadcast', function() {
        saveObject.logContents();
    }); 

});

app.controller('contentCtrl', function($scope, saveObject) {
	var componentCount = 0;
	$scope.containers = saveObject.getLayout();
	$scope.components = [];

	$scope.delComponent = function(thing) {
		saveObject.updateComponents('del', thing.id, thing.className, thing.container);
		for (var i = 0; i < $scope.components.length; i++) {
			if(thing.id == $scope.components[i].id) {
				this.components.splice(i, 1);
				componentCount--;
			}
		}
	};

	$scope.dropCallback = function(event, ui) {
		componentCount++; 
		$scope.components.push({'id':componentCount, 'className' : ui.helper.context.className, 'container':$scope.item.id});
		saveObject.updateComponents('add', componentCount, ui.helper.context.className, $scope.item.id);
	};
	
    $scope.$on('handleBroadcast', function() {
    	saveObject.logContents();
    }); 
});

app.controller('productCtrl', function($scope) {
	$scope.startcomponents = [{'className': 'componentWdgt'},{'className': 'componentImg'},{'className': 'componentTxt'}];
});

app.controller('submitCtrl', function($scope, saveObject) {
	$scope.saveLayout = function() {
		saveObject.prepForBroadcast();
//		http://jsfiddle.net/simpulton/XqDxG/
		saveObject.logContents();
	};
});