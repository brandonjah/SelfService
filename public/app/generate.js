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
		
		if(_component.type == "image_text") {
			if(_component.align == "left") {
				//left
			} else {
				//right
			}
		} else if(_component.type) {
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
        link: function (scope, attr) {
        	if(scope.$parent.container.component.align) {
        		attr.context.className+=(" "+scope.$parent.container.component.align);
        	} else {
        		attr.context.className+=" alignLeft";
        	}
        	
        	if(scope.$parent.container.component.width) {
        		attr.context.className+=(" "+scope.$parent.container.component.width.id);
        	} else {
        		attr.context.className+=" halfWidth";
        	}
        }
	};
});

app.directive('widgetDir',function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "assets/app/components/widget.html",
        link: function (scope, attr) {
        	for (var i=0;i<scope.$parent.container.component.tabs.length;i++) {
        		attr.append("<span class='widgetTab p5'>"+scope.$parent.container.component.tabs[i].id+" "+scope.$parent.container.component.tabs[i].order+" "+scope.$parent.container.component.tabs[i].active+"</span>");
        	}
        }
	};
});