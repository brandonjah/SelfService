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
	    	if(dbReturnObj.containers) {
	    		dbLayoutObj = dbReturnObj;
	    	} else {
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
	    			dbLayoutObj.containers[i].component = {};
	    			dbLayoutObj.containers[i].component.tabs = [];
	    			dbLayoutObj.containers[i].component.text = container.component.text;
					dbLayoutObj.containers[i].component.width = container.component.width;
					dbLayoutObj.containers[i].component.align = container.component.align;
					dbLayoutObj.containers[i].component.tabs = container.component.tabs;
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
	    
	    sharedService.rowCounter = function() {
	    	for (var i=0;i<dbLayoutObj.containers.length;i++) {
	    		var rows = [];
	    		if(dbLayoutObj.containers[i].component.showHotel == true) {
	    			console.log("hotel row: " + i);
	    			rows.push(i);
	    		}
	    	}
	    	//make rows an array
	    	return rows;
	    };

	    return sharedService;
	});