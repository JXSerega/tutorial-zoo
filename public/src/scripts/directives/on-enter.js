angular
    .module('ZooApp')
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
    });