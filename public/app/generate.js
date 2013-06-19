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
		console.log("containerClass:");
		console.log(_component);
	};
	
	$scope.componentClass = function(_component) {
		return _component.type+"ComponentClass aresHeaderImage";
		console.log("componentClass:");
		console.log(_component);
	};
	
	$scope.url = function(_component) {
		
		if(_component.type == "image_widget") {
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