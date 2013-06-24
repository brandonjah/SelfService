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
        	var parent = elem.parent();
        	if(scope.$parent.container.component.align == "right") {
        		parent.addClass(" aresHeaderReversed");
        	}
        	if(scope.$parent.container.component.width) {
        		parent.addClass("aresHeader"+scope.$parent.container.component.width.id);
        	} else {
        		parent.addClass("aresHeaderHalf");
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
		templateUrl: "assets/app/components/text_directive.html",
        link: function (scope, elem) {
        	if(scope.$parent.container.component.type == "image_text") {
        		var parent = elem.parent();
        		parent.addClass("aresheaderTextContainer");
        	}
        }
	};
});

app.directive('headlineText',function() {
	return {
		restrict: 'E',
		replace: true,
        link: function (scope, elem) {
        	var parent = elem.parent();
        	if(scope.$parent.container.component.header){
        		parent.append("<h1>"+scope.$parent.container.component.header+"</h1>");
        	} else {
        		parent.append("<h1>No header input</h1>");
        	}
        	elem.remove();
        }
	};
});

app.directive('contentText',function() {
	return {
		restrict: 'E',
		replace: true,
        link: function (scope, elem) {
        	var parent = elem.parent();
        	if(scope.$parent.container.component.textArea){
        		parent.append("<p>"+scope.$parent.container.component.textArea+"</p>");
        	} else {
        		parent.append("<p>No content input</p>");
        	}
        	elem.remove();
        }
	};
});

app.directive('componentDir',function(saveObject) {
	return {
		restrict: 'E',
		replace: true,
        link: function (scope, elem, attr) {
        	var contID = "."+scope.$parent.container.id;
        	var parentDiv = elem.parent();
        		for(var x=0;x<scope.$parent.container.component.tier;x++) {
		        		var li = jQuery(".cloneElement").clone();
		        		li.removeClass("cloneElement");
		        		parentDiv.append(li);
	        		}
        		parentDiv.addClass("aresTier"+scope.$parent.container.component.tier);
        	jQuery(".cloneElement").remove();
        	elem.remove();
        }
	};
});
