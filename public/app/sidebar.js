app.controller('sidebarContainerCtrl', function($scope, saveObject) {
	$scope.containers = saveObject.getLayout();
});

app.controller('headerCtrl', function($scope) {
	  $scope.items = [
	                  "Full Widget",
	                  "Full Header",
	                  "Full Text",
	                  "Widget + 3/4 Image"
	                ];
});


app.controller('productCtrl', function($scope, saveObject) {	
	$scope.setContainer = function(container) {
		console.log("setContainer");
		console.log(container);
		console.log($scope.className);
		container.className = $scope.className;
		saveObject.sidebarUpdateContainer(container);
	}
	$scope.selectedProduct = "Add Content";
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
	$scope.align = ["left","right"];
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
//	                  {"text":"Full Widget","enabled":"w","className":"fw"},
//	                  {"text":"Full Image","enabled":"i","className":"fi"},
//	                  {"text":"Full Text","enabled":"t","className":"ft"},
//	                  {"text":"Widget + 3/4 Image","enabled":"wi","className":"w34i"},
//	                  {"text":"Widget + 1/4 Image","enabled":"wi","className":"w14i"},
//	                  {"text":"Widget + 1/2 Image","enabled":"wi","className":"w12i"},
//	                  {"text":"Widget + 3/4 Text","enabled":"wt","className":"w34t"},
//	                  {"text":"Widget + 1/4 Text","enabled":"wt","className":"w14t"},
//	                  {"text":"Widget + 1/2 Text","enabled":"wt","className":"w12t"},
//	                  {"text":"Text + 3/4 Image","enabled":"ti","className":"t34i"},
//	                  {"text":"Text + 1/4 Image","enabled":"ti","className":"t14i"},
//	                  {"text":"Hotel","enabled":"h","className":"hotel"},
//	                  {"text":"Attraction","enabled":"a","className":"attraction"},
//	                  {"text":"Deals","enabled":"d","className":"deal"}
	                ];
	  $scope.selection = function(choice) {
		  $scope.selectedProduct = choice.text;
		  $scope.className = choice.className;
		  $scope.widget = false;
		  $scope.image = false;
		  $scope.text = false;
			$scope.hotel = false;
			$scope.attraction = false;
			$scope.deal = false;
		  switch (choice.enabled)
		  {
		  case "w":
			  $scope.widget = true;
		    break;
		  case "i":
			  $scope.image = true;
		    break;
		  case "t":
			  $scope.text = true;
		    break;
		  case "wi":
			  $scope.image = true;
			  $scope.widget = true;
		    break;
		  case "wt":
			  $scope.text = true;
			  $scope.widget = true;
		    break;
		  case "ti":
			  $scope.text = true;
			  $scope.image = true;
		    break;
		  case "h":
				$scope.hotel = true;
		    break;
		  case "a":
				$scope.attraction = true;
		    break;
		  case "d":
				$scope.deal = true;
		    break;
		  }
	  };
});



app.controller('footerCtrl', function($scope) {
	  $scope.items = [
	                  "Full Widget",
	                  "Full Header",
	                  "Full Text",
	                  "Widget + 3/4 Image"
	                ];
});
