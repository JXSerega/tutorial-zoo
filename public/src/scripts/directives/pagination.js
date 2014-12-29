angular
    .module('ZooApp')
    .directive('pagination', [function(){
        return {
            restrict: 'A',
            replace: true,
            scope: {
                pagination: '='
            },
            templateUrl: '/src/templates/modules/directives/pagination.html'
        };
    }]);