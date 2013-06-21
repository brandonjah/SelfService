app.controller('sidebarContainerCtrl', function($scope, saveObject) {
	$scope.isCollapsed = true;
	$scope.containers = saveObject.getLayout();
	$scope.addContainer = function() {
		saveObject.updateContainers("Product", 'add');
	};
	$scope.delContainer = function(item) {
		saveObject.updateContainers(item.id, 'del');
	};
});

app.controller('productCtrl', function($scope, saveObject) {
	$scope.isCollapsed = true;
	$scope.containers = saveObject.getLayout();
	$scope.addContainer = function() {
		saveObject.updateContainers("Product", 'add');
		//@TODO rewrite as promise
		$scope.containers = saveObject.getLayout();
	};
	$scope.delContainer = function(item) {
		saveObject.updateContainers(item.id, 'del');
		//@TODO rewrite as promise
		$scope.containers = saveObject.getLayout();
	};	
	
	//start modal
	$scope.openModal = function (openedContainer) {			
			  $scope.sortableOptions = {
		          update: function( event, ui ) {
		        	  $scope.tabs = ui.item.sortable.resort.$modelValue;
		              $scope.$apply();
		          },
			    	axis: 'y'
			  };
			$scope.openedContainer = openedContainer;
			$scope.openedContainer.component.layered = true;
		    $scope.shouldBeOpen = true;
	  };

	  $scope.close = function () {
		  $scope.shouldBeOpen = false;
	  };
	  
	  $scope.opts = {
		  backdropFade: true,
		  dialogFade:true
	  };
	  
	  $scope.disable = function(_id) {
		  for (var i = 0; i < $scope.tabs.length; i++) {
			  if($scope.tabs[i].id == _id) {
				  if($scope.tabs[i].active == true) {
					  $scope.tabs[i].active = false;
				  } else {
					  $scope.tabs[i].active = true;
				  }
			  }
		  }
	  };


	//end modal	
	
	$scope.setContainer = function(passedContainer) {
		/*FUNCTIONS*/
		function arrayObjectIndexOf(myArray, searchTerm, property) {
		    for(var i = 0, len = myArray.length; i < len; i++) {
		        if (myArray[i][property] === searchTerm) return i;
		    }
		    return -1;
		}
		/*END FUNCTIONS*/
		
		$scope.close();
		
		//UPDATE ORDER PROPERTY BASED OFF OF DRAG DROP
		for (var i = 0; i < $scope.tabs.length; i++) {
			$scope.tabs[i].order = arrayObjectIndexOf($scope.tabs, $scope.tabs[i].id, "id");
		}
		
		passedContainer.component.tabs = $scope.tabs;
		
		for (var i=0;i<$scope.containers.length;i++) {
			if($scope.containers[i].id == passedContainer.id) {
				$scope.containers[i].component = passedContainer.component;
				$scope.containers[i].className = passedContainer.component.type+(passedContainer.component.align||"")+
				((passedContainer.component.width) ? passedContainer.component.width.id : "")+((passedContainer.component.tier) ? passedContainer.component.tier : "");
			}
		}
		saveObject.sidebarUpdateContainer($scope.containers);
	};

	$scope.classname;
	$scope.tabs = [{id:"hotel",order:"0",active:true},{id:"deal",order:"1",active:true},{id:"car",order:"2",active:true},{id:"flight",order:"3",active:true},{id:"ticket",order:"4",active:true}];
	$scope.widths = [
	                 {"text":"3/4","id":"ThreeQtr"},
	                 {"text":"1/2","id":"Half"}
	                 ];	
	$scope.tiers = ["1","2","3","4","5"];
	$scope.selectedTiers = [];
	$scope.setTiers = function(_tiers) {
		for (var i=0;i<_tiers;i++) {
			$scope.selectedTiers.push(i);
		}
	}
	$scope.alignments = ["left","right"];
	  $scope.items = [
	                  {"text":"Widget","enabled":"w","className":"fw"},
	                  {"text":"Image","enabled":"i","className":"fi"},
	                  {"text":"Text","enabled":"t","className":"ft"},
	                  {"text":"Widget + Image","enabled":"wi","className":"w34i"},
	                  {"text":"Image + Text","enabled":"it","className":"t34i"},
	                  {"text":"Hotel","enabled":"h","className":"hotel"},
	                  {"text":"Attraction","enabled":"a","className":"attraction"},
	                  {"text":"Deals","enabled":"d","className":"deal"}
	                ]; 
	  
	  $scope.selection = function(choice,container) {
		  $scope.selectedProduct = choice.text;
		  for (var i=0;i<$scope.containers.length;i++) {
			  if(container.id == $scope.containers[i].id) {
				  $scope.containers[i].component = {};
				  switch (choice.enabled)
				  {
				  case "w":
					  $scope.containers[i].component = {type:"widget",text:"Widget",showWidget:true};
				    break;
				  case "i":
					  $scope.containers[i].component = {type:"image",text:"Image",showImage:true};
				    break;
				  case "t":
					  $scope.containers[i].component = {type:"text",text:"Text",showText:true};
				    break;
				  case "wi":
					  $scope.containers[i].component = {type:"image_widget",text:"Image + Widget",showImageWidget:true};
				    break;
				  case "it":
					  $scope.containers[i].component = {type:"image_text",text:"Image + Text",showImageText:true};
				    break;
				  case "h":
						$scope.containers[i].component = {type:"hotel",text:"Hotel",showHotel:true};
				    break;
				  case "a":
						$scope.containers[i].component = {type:"attraction",text:"Attraction",showAttraction:true};
				    break;
				  case "d":
						$scope.containers[i].component = {type:"deal",text:"Deal",showDeal:true};
				    break;
				  }
			  }
		  }
		  $scope.openModal(container);
	  };
});
