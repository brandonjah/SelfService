app.factory('saveObject', function($routeParams) {
	    var sharedService = {};
	    var dbLayoutObj = [];
	    dbLayoutObj.containers = [{"id":"Header0"},{"id":"Product1"},{"id":"Footer2"}];
    	var containerCount = 3;
    	var componentCount = 0;
    	dbLayoutObj.siteId = $routeParams.siteId;
	    
	    sharedService.getLayout = function() {
	    	return dbLayoutObj.containers;
	    };
	    
	    sharedService.getSiteId = function() {
	    	return dbLayoutObj.siteId;
	    };
	    
	    sharedService.update = function(dbReturnObj) {
	    	console.log("in shared service update");
	    	console.log(dbReturnObj);
	    	if(dbReturnObj.containers) {
	    		console.log("not null");
	    		dbLayoutObj = dbReturnObj;
	    	} else {
	    		console.log("null");
	    		dbLayoutObj.containers = [];
	    	}
	    };
	    
	    sharedService.clear = function() {
	    	dbLayoutObj.containers = [];
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
    		
    		sharedService.updateComponentProperties = function(newComponent) {
    			//@TODO find component by id then replace it newComponent
    		}
	    };

	    sharedService.updateContainers = function(id, oper) {
	    	if(oper == 'add') {
	    		dbLayoutObj.containers.push({'id':(id+containerCount),'components':[]});
	    		containerCount++;
	    	} else if (oper == 'del') {
	    		for (var i = 0; i < dbLayoutObj.containers.length; i++) {
	    			if(id == dbLayoutObj.containers[i].id) {
	    				dbLayoutObj.containers.splice(i, 1);
	    				containerCount--;
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
	  var componentClassName;
	  $scope.opts = {
	    backdrop: true,
	    keyboard: true,
	    backdropClick: true,
	    templateUrl: '/assets/app/partials/properties.html',
	    controller: 'propertiesModalCtrl',
	    resolve:       {componentClassName: function() {return angular.copy($scope.widget);}}
	  };

	  $scope.openProperties = function(viewComponent){
	    if(viewComponent.className == "componentWdgt") {
		  	  $scope.widget = "Widget";
		    } else if(viewComponent.className == "componentImg") {
		  	  $scope.widget = "Image";
		    } else if(viewComponent.className == "componentTxt") {
		  	  $scope.widget = "Text";
		    } else {
		    	$scope.widget = "somethingElse";
		    }
	    var d = $dialog.dialog($scope.opts);
	    d.open().then(function(result){
	      if(result)
	      {
	    	  console.log(viewComponent);
	        componentWidth = result.radioModel;
	        viewComponent.width = result.radioModel;
	        saveObject.updateComponentProperties(viewComponent);
	        //$scope.item.id
	      }
	    });
	  };
});

function CollapseCtrl($scope) {
	  $scope.isCollapsed = true;
	}

app.controller('propertiesModalCtrl', function($scope, dialog, componentClassName){
	$scope.widget = componentClassName;
	$scope.updateWidget = function(viewComponent) {
		console.log("update Widget: ");
		console.log(viewComponent);
	};
	$scope.result = {};  
	$scope.result.radioModel = 'Third';

	  $scope.close = function(result){
		//result.radioModel
	    dialog.close(result);
	  };
});

app.controller('componentCtrl', function($scope) {
	$scope.startcomponents = [{'className': 'componentWdgt'},{'className': 'componentImg'},{'className': 'componentTxt'}];
});

app.controller('headerCtrl', function($scope) {
	  $scope.items = [
	                  "Full Widget",
	                  "Full Header",
	                  "Full Text",
	                  "Widget + 3/4 Image"
	                ];
});
app.controller('productCtrl', function($scope) {
	  $scope.items = [
	                  "Full Widget",
	                  "Full Header",
	                  "Full Text",
	                  "Widget + 3/4 Image"
	                ];
});
app.controller('footerCtrl', function($scope) {
	  $scope.items = [
	                  "Full Widget",
	                  "Full Header",
	                  "Full Text",
	                  "Widget + 3/4 Image"
	                ];
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