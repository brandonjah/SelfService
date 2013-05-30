app.controller('headerCtrl', function($scope) {
	  $scope.items = [
	                  "Full Widget",
	                  "Full Header",
	                  "Full Text",
	                  "Widget + 3/4 Image"
	                ];
});


app.controller('productCtrl', function($scope) {
	$scope.selectedProduct = "Add Content";
	$scope.widget = false;
	  $scope.widgetTabs = {
			    hotel: false,
			    deal: true,
			    car: false,
			    ticket: false,
			    flight: false
			  };
	$scope.image = false;
	$scope.text = false;
	$scope.hotel = false;
	$scope.attraction = false;
	$scope.deal = false;
	$scope.classname;
	  $scope.items = [
	                  {"text":"Full Widget","enabled":"w","className":"fw"},
	                  {"text":"Full Image","enabled":"i","className":"fi"},
	                  {"text":"Full Text","enabled":"t","className":"ft"},
	                  {"text":"Widget + 3/4 Image","enabled":"wi","className":"w34i"},
	                  {"text":"Widget + 1/4 Image","enabled":"wi","className":"w14i"},
	                  {"text":"Widget + 1/2 Image","enabled":"wi","className":"w12i"},
	                  {"text":"Widget + 3/4 Text","enabled":"wt","className":"w34t"},
	                  {"text":"Widget + 1/4 Text","enabled":"wt","className":"w14t"},
	                  {"text":"Widget + 1/2 Text","enabled":"wt","className":"w12t"},
	                  {"text":"Text + 3/4 Image","enabled":"ti","className":"t34i"},
	                  {"text":"Text + 1/4 Image","enabled":"ti","className":"t14i"},
	                  {"text":"Hotel","enabled":"h","className":"hotel"},
	                  {"text":"Attraction","enabled":"a","className":"attraction"},
	                  {"text":"Deals","enabled":"d","className":"deal"},
	                ];
	  $scope.selection = function(choice) {
		  $scope.selectedProduct = choice.text;
		  switch (choice.enabled)
		  {
		  case "w":
			  $scope.widget = true;
			  $scope.image = false;
			  $scope.text = false;
				$scope.hotel = false;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "i":
			  $scope.image = true;
			  $scope.widget = false;
			  $scope.text = false;
				$scope.hotel = false;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "t":
			  $scope.text = true;
			  $scope.image = false;
			  $scope.widget = false;
				$scope.hotel = false;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "wi":
			  $scope.image = true;
			  $scope.widget = true;
			  $scope.text = false;
				$scope.hotel = false;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "wt":
			  $scope.text = true;
			  $scope.widget = true;
			  $scope.image = false;
				$scope.hotel = false;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "ti":
			  $scope.text = true;
			  $scope.image = true;
			  $scope.widget = false;
				$scope.hotel = false;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "h":
			  $scope.text = false;
			  $scope.image = false;
			  $scope.widget = false;
				$scope.hotel = true;
				$scope.attraction = false;
				$scope.deal = false;
		    break;
		  case "a":
			  $scope.text = false;
			  $scope.image = false;
			  $scope.widget = false;
				$scope.hotel = false;
				$scope.attraction = true;
				$scope.deal = false;
		    break;
		  case "d":
			  $scope.text = false;
			  $scope.image = false;
			  $scope.widget = false;
				$scope.hotel = false;
				$scope.attraction = false;
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
