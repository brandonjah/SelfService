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
	  var componentClassName = "something";
	  $scope.opts = {
	    backdrop: true,
	    keyboard: true,
	    backdropClick: true,
	    templateUrl: '/assets/app/partials/properties.html',
	    controller: 'propertiesModalController',
	    resolve:       {componentClassName: function() {return angular.copy($scope.widget);}}
	  };

	  $scope.openProperties = function(viewComponent){
	    if(viewComponent == "componentWdgt") {
		  	  $scope.widget = "Widget";
		    } else if(viewComponent == "componentImg") {
		  	  $scope.widget = "Image";
		    } else if(viewComponent == "componentTxt") {
		  	  $scope.widget = "Text";
		    } else {
		    	$scope.widget = "Something Else";
		    }
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

app.controller('propertiesModalController', function($scope, dialog, componentClassName){
	$scope.widget = componentClassName;
	$scope.updateWidget = function(viewComponent) {

	};
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

app.directive('ckEditor', function() {
	  return {
	    require: '?ngModel',
	    link: function(scope, elm, attr, ngModel) {
	      var ck = CKEDITOR.replace(elm[0],
	            {
	                toolbar_Full:
	                [
	                { name: 'document', items : [] },
	                { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
	                { name: 'editing', items : [ 'Find','Replace','-','SpellChecker', 'Scayt' ] },
	                { name: 'forms', items : [] },
	                { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript' ] },
	                { name: 'paragraph', items : [
	                'NumberedList','BulletedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] },
	                { name: 'links', items : [] },
	                { name: 'insert', items : [ 'SpecialChar' ] },
	                '/',
	                { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
	                { name: 'colors', items : [] },
	                { name: 'tools', items : [ 'Maximize' ] }
	                ]
	                ,
	                height: '290px',
	                width: '99%'
	            }
	    );

	      if (!ngModel) return;

	      //loaded didn't seem to work, but instanceReady did
	      //I added this because sometimes $render would call setData before the ckeditor was ready
	      ck.on('instanceReady', function() {
	        ck.setData(ngModel.$viewValue);
	      });

	      ck.on('pasteState', function() {
	        scope.$apply(function() {
	          ngModel.$setViewValue(ck.getData());
	        });
	      });

	      ngModel.$render = function(value) {
	        ck.setData(ngModel.$viewValue);
	      };

	    }
	  };
	});