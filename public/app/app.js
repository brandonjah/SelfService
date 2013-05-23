var app = angular.module('LandingPage', ['ngDragDrop','ui.bootstrap','colorpicker.module', 'blueimp.fileupload']);

app.config(['$routeProvider', '$httpProvider', 'fileUploadProvider',
    function($routeProvider) {
	  $routeProvider.
	      when('/layout/:siteId', {templateUrl: 'assets/app/partials/layout.html', controller: this.containerCtrl}).
	      when('/info', {templateUrl: 'assets/app/partials/base-info.html', controller: this.BaseInfoCtrl}).
	      otherwise({redirectTo: '/info'});
	}
]);

app.directive('fileDirective', function() {
    return {
        template: '<li>{{file.name}}</li>',
        replace: true,
        restrict: 'E',
//        scope: {
//            filename: '=ngModel'
//        },

        link: function(scope, elm, attrs) {

            $(elm).fileupload({
                dataType: 'json',
                paramName: 'files[]',
                url: '/test',
                add: function(e, data) {
                	alert('in add');
                },
                progressall: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    scope.$apply(function() {
                        scope.progress = progress;
                    });

                },

                done: function(e, data) {

                    $.each(data.result, function(index, file) {
                        scope.$apply(function() {
                            scope.filename = file.name;
                        });
                    })

                }
            });
        }

    }
});