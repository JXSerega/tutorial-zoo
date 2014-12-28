angular
    .module('ZooApp')
    .directive('back', ['$window', '$location', function($window, $location){
        return {
            restrict: 'A',
            scope: {
                url: '@back'
            },
            link: function(scope, element) {
                element.bind('click', function(){
                    if (!$window.history.length && scope.url) {
                        $location.url(scope.url);
                    } else {
                        $window.history.back();
                    }

                    scope.$apply();
                });
            }
        };
    }]);