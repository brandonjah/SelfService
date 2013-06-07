app.factory('saveObject', function($routeParams) {
	    var sharedService = {};
	    var dbLayoutObj = [];
	    dbLayoutObj.containers = [{id:"Product0",component:{text:"Choose Content"}}];
    	var containerCount = 1;
    	var componentCount = 0;
    	dbLayoutObj.bundleId = $routeParams.bundleId;
	    
	    sharedService.getLayout = function() {
	    	return dbLayoutObj.containers;
	    };
	    
	    sharedService.getbundleId = function() {
	    	return dbLayoutObj.bundleId;
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
	    	dbLayoutObj.containers = [{id:"Product0",component:{text:"Choose Content"}}];
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
	    
	    sharedService.sidebarUpdateContainer = function(container) {
	    	for (var i=0;i<dbLayoutObj.containers.length;i++) {
	    		if(container.id == dbLayoutObj.containers[i].id) {
					dbLayoutObj.containers[i] = container;
	    		}
	    	}
	    };

	    sharedService.updateContainers = function(id, oper) {
	    	if(oper == 'add') {
//	    		dbLayoutObj.containers.push({'id':(id+containerCount),'components':[]});
	    		dbLayoutObj.containers.push({id:(id+containerCount),component:{text:'Choose Content'}});
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