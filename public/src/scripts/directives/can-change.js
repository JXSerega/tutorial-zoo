angular
    .module('ZooApp')
    .directive('canChange', [function(){
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: '/src/templates/modules/directives/can-change.html'
        };
    }]);