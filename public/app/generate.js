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
			if(_component.type == "hotel"||_component.type == "attraction"||_component.type == "deal") {
				  return "assets/app/components/"+_component.type+_component.tier+".html";
			} else {
				return "assets/app/components/"+_component.type+".html";
			}
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
