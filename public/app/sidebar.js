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
		//http://stackoverflow.com/questions/14549942/angular-sortable-orderby-object-property?lq=1
		//https://github.com/angular-ui/angular-ui/pull/119
		//http://plnkr.co/edit/IcYTPU
		$scope.tabs = [{id:"hotel",order:"1"},{id:"deal",order:"2"},{id:"car",order:"3"},{id:"flight",order:"4"},{id:"ticket",order:"5"}];
		  $scope.sortableOptions = {
	          update: function( event, ui ) {
	        	  $scope.tabs = ui.item.sortable.resort.$modelValue;
	              for (var i = 0; i < $scope.tabs.length; i++) {
	                  $scope.tabs[i] = ui.item.sortable.resort.$modelValue[i];
	                  if($scope.tabs[i].order == ui.item.sortable.index) {
	                	  console.log("moved item");
	                	  console.log($scope.tabs[i]);
	                  }
	              }
	              $scope.$apply();
	          },
		    	axis: 'y'
		  };
		
		$scope.openedContainer = openedContainer;
	    $scope.shouldBeOpen = true;
	  };

	  $scope.close = function () {
	    $scope.shouldBeOpen = false;
	  };
	  
	  $scope.opts = {
	    backdropFade: true,
	    dialogFade:true
	  };

	  
//      $("#tabsSortable").sortable({
//          update: function( event, ui ) {
//              var uiArray = $("#tabsSortable").sortable('toArray');
//              for (var i = 0; i < $scope.tabs.length; i++) {
//                  $scope.tabs[i].order = uiArray.indexOf($scope.tabs[i].id) + 1;
//              }
//              $scope.$apply();
//          }
//      });  
	//end modal	
	
	$scope.setContainer = function(passedContainer) {
		$scope.close();
		for (var i=0;i<$scope.containers.length;i++) {
			if($scope.containers[i].id == passedContainer.id) {
				$scope.containers[i].component = passedContainer.component;
				$scope.containers[i].className = passedContainer.component.type+(passedContainer.component.align||"")+
				((passedContainer.component.width) ? passedContainer.component.width.id : "")+((passedContainer.component.tier) ? passedContainer.component.tier.id : "");
			}
		}
		saveObject.sidebarUpdateContainer($scope.containers);
	};
	
	  $scope.widgetTabs = {
			    hotel: true,
			    deal: true,
			    car: true,
			    ticket: true,
			    flight: true
			  };

	$scope.classname;
	$scope.widths = [
	                 {"text":"1/4","id":"14"},
	                 {"text":"3/4","id":"34"},
	                 {"text":"1/2","id":"12"}
	                 ];
	$scope.tiers = [
	                {"id":"1"},
	                {"id":"2"},
	                {"id":"3"},
	                {"id":"4"},
	                {"id":"5"}
	                ];
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
