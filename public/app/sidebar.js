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
	//start modal
	$scope.openModal = function () {
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
	
	$scope.setContainer = function(container) {
		console.log("setContainer");
		console.log(container);
		console.log($scope.components);
		container.className = $scope.className;
		container.components = $scope.components;
		saveObject.sidebarUpdateContainer(container);
	};
	
	$scope.components = [];
	$scope.selectedProduct = "Content Properties";
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
	                 {"text":"1/2","id":"12"},
	                 {"text":"Full","id":"1"}
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
	                  {"text":"Widget + Text","enabled":"wt","className":"w34t"},
	                  {"text":"Text + Image","enabled":"ti","className":"t34i"},
	                  {"text":"Hotel","enabled":"h","className":"hotel"},
	                  {"text":"Attraction","enabled":"a","className":"attraction"},
	                  {"text":"Deals","enabled":"d","className":"deal"}
	                ]; 
	  
	  $scope.selection = function(choice) {
		  $scope.components = [];
		  $scope.selectedProduct = choice.text;
		  $scope.className = choice.className;

		  switch (choice.enabled)
		  {
		  case "w":
			  $scope.components.push({"type":"widget",showWidget:true});
		    break;
		  case "i":
			  $scope.components.push({"type":"image",showImage:true});
		    break;
		  case "t":
			  $scope.components.push({"type":"text",showText:true});
		    break;
		  case "wi":
			  $scope.components.push({"type":"image",showImage:true},{"type":"widget",showWidget:true});
		    break;
		  case "wt":
			  $scope.components.push({"type":"text",showText:true},{"type":"widget",showWidget:true});
		    break;
		  case "ti":
			  $scope.components.push({"type":"text",showText:true},{"type":"image",showImage:true});
		    break;
		  case "h":
				$scope.components.push({"type":"hotel",showHotel:true});
		    break;
		  case "a":
				$scope.components.push({"type":"attraction",showAttraction:true});
		    break;
		  case "d":
				$scope.components.push({"type":"deal",showDeal:true});
		    break;
		  }
		  $scope.openModal();
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
