app.controller('GenerateCtrl', function($scope, saveObject) {
	$scope.containers = saveObject.getLayout();
	
	$scope.containerClass = function(_component) {
		if(_component.type == "text") {
			return "aresheaderTextContainer";
		} else if(_component.type == "image") {
			return "aresHeaderImage";
		} else if(_component.type == "widget") {
			return "aresBotContainer";
		}
	};
	
	$scope.componentClass = function(_component) {
		return _component.type+"ComponentClass aresHeaderImage";
		console.log("componentClass:");
		console.log(_component);
	};
	
	$scope.url = function(_component) {
		if(_component.type) {
			return "assets/app/components/"+_component.type+".html";
		} else {
			return "assets/app/partials/preview.html";
		}
	};
});

app.directive('imageDir',function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "assets/app/components/image.html",
        link: function (scope, elem) {
        	if(scope.$parent.container.component.align == "right") {
        		scope.$parent.container.className+=(" aresHeaderReversed");
        	}
        	if(scope.$parent.container.component.width) {
        		elem.context.className+=(" aresHeader"+scope.$parent.container.component.width.id);
        	} else {
        		scope.$parent.container.className+=(" aresHeaderHalf");
        	}
        }
	};
});

app.directive('widgetDir',function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "assets/app/components/widget_directive.html",
        link: function (scope, elem) {
        	elem.append("<span>Layered: "+scope.$parent.container.component.layered+"</span> |||");
        	for (var i=0;i<scope.$parent.container.component.tabs.length;i++) {
        		elem.append("<span class='widgetTab p5'>"+scope.$parent.container.component.tabs[i].id+" "+scope.$parent.container.component.tabs[i].order+" "+scope.$parent.container.component.tabs[i].active+"</span>");
        	}
        }
	};
});

app.directive('textDir',function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "assets/app/components/text_directive.html"
	};
});

app.directive('headlineText',function() {
	return {
		restrict: 'E',
		replace: true,
        link: function (scope, elem) {
        	elem.append("<h1>"+scope.$parent.container.component.header+"</h1>");
        }
	};
});

app.directive('contentText',function() {
	return {
		restrict: 'E',
		replace: true,
        link: function (scope, elem) {
        	elem.append("<p>"+scope.$parent.container.component.textArea+"</p>");
        }
	};
});

app.directive('hotelDir',function(saveObject) {
	return {
		restrict: 'E',
		replace: true,
        link: function (scope, elem, attr) {
        	var contID = "."+scope.$parent.container.id;
        	var parentDiv = elem.parent();
        		for(var x=0;x<scope.$parent.container.component.tier;x++) {
        			console.log("iterating tiers");
        			console.log(scope.$parent.container.component.tier);
		        		var ul = jQuery(".cloneElement").clone();
		        		ul.removeClass("cloneElement");
		        		ul.addClass("aresTier"+scope.$parent.container.component.tier);
		        		parentDiv.append(ul);
	        		}
        	
        	jQuery(".cloneElement").remove();
        }
	};
});
app.directive('attractionDir',function(rowCounter) {
	return {
		restrict: 'E',
        link: function (scope, elem) {
        	jQuery(".aresProductTicket").addClass("aresTier"+scope.$parent.container.component.tier);
        	var ul = jQuery(".aresProductItemsList").clone();        	
        	elem = ul;
        	var parentDiv = jQuery(".aresProductItemsListWrap");
        	for(var i=1;i<scope.$parent.container.component.tier;i++) {
        		var iUl = elem.clone();
        		parentDiv.append(iUl);
        	}
        }
	};
});
app.directive('dealsDir',function(rowCounter) {
	return {
		restrict: 'E',
        link: function (scope, elem) {
        	jQuery(".aresProductPackage").addClass("aresTier"+scope.$parent.container.component.tier);
        	var ul = jQuery(".aresProductItemsList").clone();        	
        	elem = ul;
        	var parentDiv = jQuery(".aresProductItemsListWrap");
        	for(var i=1;i<scope.$parent.container.component.tier;i++) {
        		var iUl = elem.clone();
        		parentDiv.append(iUl);
        	}
        }
	};
});

app.factory('rowCounter', function() {
	var rows = {};
	var hotelRows = 0;
	var attractionRows = 0;
	var dealsRows = 0;
	rows.increase = function() {
		hotelRows++;
	}
	
	rows.getHotelRows = function() {
		return hotelRows;
	} 
	return rows;
});