angular
    .module('ZooApp')
    .directive('go', ['$location', function($location){
        return {
            strict: 'A',
            scope: {
                link: '=go'
            },
            link: function(scope, element){
                element.css({
                    cursor: 'pointer'
                });

                element.on('click', function(){
                    $location.url(scope.link);
                    scope.$apply();
                });
            }
        };
    }])
    .directive('back', ['$window', '$location', function($window, $location){
        return {
            restrict: 'A',
            scope: {
                link: '@back'
            },
            link: function(scope, element) {
                element.bind('click', function(){
                    if (!$window.history.length && scope.link) {
                        $location.url(scope.link);
                    } else {
                        $window.history.back();
                        scope.$apply();
                    }
                });
            }
        };
    }])
    .directive('onEnter', function () {
        return function (scope, element, attr) {
            element.bind('keydown keypress', function (event) {
                // key code [Enter]
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attr.onEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('onEsc', function () {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                // key code [ESC]
                if (event.which === 27) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('canChange', [function(){
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: '/src/templates/modules/directives/can-change.html'
        };
    }]);