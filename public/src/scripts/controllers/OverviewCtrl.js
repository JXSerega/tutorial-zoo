angular
    .module('ZooApp')
    .controller('OverviewCtrl', [
        '$scope', 'Animals', 'Eats', 'Pagination',
        function($scope, Animals, Eats, Pagination){
            $scope.animalsPagination = Pagination.getNew(10);
            $scope.eatsPagination = Pagination.getNew(10);

            $scope.animals = Animals.query(function(){
                $scope.animalsPagination.numPages = Math.ceil(
                    $scope.animals.length / $scope.animalsPagination.perPage
                );
            });

            $scope.eats = Eats.query(function(){
                $scope.eatsPagination.numPages = Math.ceil(
                    $scope.eats.length / $scope.eatsPagination.perPage
                );
            });
        }
    ]);