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