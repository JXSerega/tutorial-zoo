angular
    .module('ZooApp')
    .directive('go', ['$location', function($location){
        return {
            strict: 'A',
            scope: {
                url: '=go'
            },
            link: function(scope, element){
                element.css({
                    cursor: 'pointer'
                });

                element.on('click', function(){
                    $location.url(scope.url);
                    scope.$apply();
                });
            }
        };
    }]);