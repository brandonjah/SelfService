app.factory('saveObject', function($routeParams) {
	    var sharedService = {};
	    var dbLayoutObj = [];
	    dbLayoutObj.containers = [];
    	var layoutCount = 0;
    	var componentCount = 0;
    	dbLayoutObj.siteId = $routeParams.siteId;
	    
	    sharedService.getLayout = function() {
	    	return dbLayoutObj.containers;
	    };
	    
	    sharedService.getSiteId = function() {
	    	return dbLayoutObj.siteId;
	    };	   

	    sharedService.updateComponents = function(oper, className, id, containerName, width) {
    		for (var i=0;i<dbLayoutObj.containers.length;i++) {
    				if((oper == 'add')&&(id == dbLayoutObj.containers[i].id)) {
    					dbLayoutObj.containers[i].components.push({'id':componentCount,'className':className, 'width':width});
    					componentCount++;
    				} else if(oper == 'del') {
    					for (var x = 0; x < dbLayoutObj.containers[i].components.length; x++) {
    						if ((className == dbLayoutObj.containers[i].components[x].className)&&(id == dbLayoutObj.containers[i].components[x].id)) {
    							dbLayoutObj.containers[i].components.splice(x, 1);
								componentCount--;
    						}
    					}
    				}
    			}
	    };

	    sharedService.updateContainers = function(id, oper) {
	    	if(oper == 'add') {
	    		dbLayoutObj.containers.push({'id':(id+layoutCount),'components':[]});
				layoutCount++;
	    	} else if (oper == 'del') {
	    		for (var i = 0; i < dbLayoutObj.containers.length; i++) {
	    			if(id == dbLayoutObj.containers[i].id) {
	    				dbLayoutObj.containers.splice(i, 1);
	    				layoutCount--;
	    			}
	    		}
	    	}
	    };
	    
	    sharedService.logContents = function() {
	    	console.log('dbLayoutObj');
	    	console.log(dbLayoutObj);
	    };

	    return sharedService;
	});

app.controller('containerCtrl', function($scope, saveObject) {
	$scope.containers = saveObject.getLayout();
	$scope.newObj = {};
	$scope.buttons = [{'name': 'Header'},{'name': 'Product'},{'name': 'Footer'}];
	
	$scope.addContainer = function(name) {
		saveObject.updateContainers(name, 'add');
	};
	
	$scope.delContainer = function(item) {
		saveObject.updateContainers(item.id, 'del');
	};

});

app.controller('componentCtrl', function($scope, $dialog, saveObject) {
	var componentWidth = "Third";
	
	$scope.delComponent = function(thing) {
		saveObject.updateComponents('del', thing.className, thing.id, thing.container, null);
	};
	
	$scope.dropCallback = function(event, ui) {
		saveObject.updateComponents('add', ui.helper.context.className, $scope.item.id, null, componentWidth);
	};
	  $scope.opts = {
	    backdrop: true,
	    keyboard: true,
	    backdropClick: true,
	    templateUrl: '/assets/app/partials/properties.html',
	    controller: 'propertiesModalController'
	  };

	  $scope.openProperties = function(){
	    var d = $dialog.dialog($scope.opts);
	    d.open().then(function(result){
	      if(result)
	      {
	        componentWidth = result.radioModel;
	      }
	    });
	  };

});

function CollapseCtrl($scope) {
	  $scope.isCollapsed = true;
	}

app.controller('propertiesModalController', function($scope, dialog){
	$scope.result = {};  
	$scope.result.radioModel = 'Third';

	  $scope.close = function(result){
	    dialog.close(result);
	  };
});

app.controller('productCtrl', function($scope) {
	$scope.startcomponents = [{'className': 'componentWdgt'},{'className': 'componentImg'},{'className': 'componentTxt'}];
});

app.controller('submitCtrl', function($scope, $http, saveObject) {
	$scope.url = '/save-layout';
	$scope.saveLayout = function() {
		saveObject.logContents();
		var containers = saveObject.getLayout();
		var siteId = saveObject.getSiteId();

		console.log('containers');
		console.log(containers);
			$http.post($scope.url, {
				"siteId" : siteId,
				"containers" : containers
				}).
		      success(function(data){
		    	  console.log('in submitCtrl success');
		          $scope.success = true;
		        }).
		        error(function(data){
		          $scope.httpError = true;
		        });
			
	};
});