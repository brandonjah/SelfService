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
    	var componentCount = 0;
	    
	    sharedService.prepForBroadcast = function() {
	        this.broadcastItem();
	    };
	    
	    sharedService.getLayout = function() {
	    	return dbLayoutObj;
	    };
	    
	    sharedService.updateComponents = function(oper, className, containerName) {
    		for (var i=0;i<dbLayoutObj.length;i++) {
    			if(containerName == dbLayoutObj[i].id) {
    				if(oper == 'add') {
    					dbLayoutObj[i].components.push({'id':componentCount,'className':className});
    					componentCount++;
    				} else if(oper == 'del') {
    					for (var x = 0; x < dbLayoutObj[i].components.length; x++) {
    						if(componentCount == dbLayoutObj[i].components[x].id) {
    							dbLayoutObj[i].components.splice(x, 1);
    							componentCount--;
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
	$scope.delComponent = function(thing) {
		saveObject.updateComponents('del', thing.id, thing.className, thing.container);
	};

	$scope.dropCallback = function(event, ui) {
		saveObject.updateComponents('add', ui.helper.context.className, $scope.item.id);
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