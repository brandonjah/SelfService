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

app.controller('headerCtrl', function($scope, $dialog) {
	  $scope.items = [
	                  {"text":"Widget","enabled":"w","className":"fw"},
	                  {"text":"Image","enabled":"i","className":"fi"},
	                  {"text":"Text","enabled":"t","className":"ft"},
	                  {"text":"Widget + Image","enabled":"wi","className":"w34i"},
	                  {"text":"Widget + Text","enabled":"wt","className":"w34t"},
	                  {"text":"Text + Image","enabled":"ti","className":"t34i"},
	                  {"text":"Empty","enabled":"","className":""}
	                ];
	  
	  $scope.opts = {
			    backdrop: true,
			    keyboard: true,
			    backdropClick: true,
			    templateUrl: '/assets/app/partials/sidebar-modal.html',
			    controller: 'headerModalCtrl',
			    resolve:       {componentClassName: function() {return angular.copy($scope.widget);}}
			  };

	  $scope.openProperties = function(){
	    var d = $dialog.dialog($scope.opts);
	    d.open().then(function(result){
	      if(result)
	      {
	    	  console.log("here");
	      }
	    });
	  };
});

app.controller('headerModalCtrl', function($scope, dialog){
	$scope.result = {};  

	  $scope.close = function(result){
	    dialog.close(result);
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
	
	$scope.widget = false;
	  $scope.widgetTabs = {
			    hotel: true,
			    deal: true,
			    car: true,
			    ticket: true,
			    flight: true
			  };
	$scope.image = false;
	$scope.text = false;
	$scope.hotel = false;
	$scope.attraction = false;
	$scope.deal = false;
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
	                {"id":"4"}
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



app.controller('footerCtrl', function($scope) {
	  $scope.items = [
	                  {"text":"Widget","enabled":"w","className":"fw"},
	                  {"text":"Image","enabled":"i","className":"fi"},
	                  {"text":"Text","enabled":"t","className":"ft"},
	                  {"text":"Widget + Image","enabled":"wi","className":"w34i"},
	                  {"text":"Widget + Text","enabled":"wt","className":"w34t"},
	                  {"text":"Text + Image","enabled":"ti","className":"t34i"},
	                  {"text":"Empty","enabled":"","className":""}
	                ];
	  
});
