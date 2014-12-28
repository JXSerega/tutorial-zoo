angular
    .module('ZooApp')
    .directive('onEsc', function () {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                // key code [ESC]
                if (event.which === 27) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEsc);
                    });
                    event.preventDefault();
                }
            });
        };
    });