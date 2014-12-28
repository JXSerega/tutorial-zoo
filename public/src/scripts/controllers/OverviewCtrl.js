angular
    .module('ZooApp')
    .controller('OverviewCtrl', [
        '$scope', 'Animals', 'Eats',
        function($scope, Animals, Eats){
            $scope.animals = Animals.query();
            $scope.eats = Eats.query();
        }
    ]);