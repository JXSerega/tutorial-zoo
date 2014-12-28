angular
    .module('ZooApp')
    .controller('AnimalCtrl', [
        '$scope', '$routeParams', '$filter', 'Animals', 'AnimalsEats', 'Eats', 'ConfirmService',
        function ($scope, $routeParams, $filter, Animals, AnimalsEats, Eats, ConfirmService) {
            $scope.animal = Animals.get({
                id: $routeParams.id
            });

            $scope.animalEats = AnimalsEats.query({
                animal_id: $routeParams.id
            });

            $scope.eat = {};
            $scope.eat.editing = {};

            $scope.eat.edit = function (i) {
                $scope.eat.editing = angular.copy($scope.animalEats[i]);
            };

            $scope.eat.cancel = function () {
                $scope.eat.editing = {};
            };

            $scope.eat.save = function (i) {
                var editing, current;
                editing = $scope.eat.editing;
                current = $scope.animalEats[i];

                if (editing.eat_volume === current.eat_volume) {
                    $scope.eat.cancel();
                    return;
                }

                current.eat_volume = editing.eat_volume;
                current.$save({
                    animal_id: $routeParams.id
                }, function(){
                    $scope.eat.cancel();
                });
            };

            $scope.eats = Eats.query(function () {
                $scope.eatsObject = $filter('list2object')($scope.eats);
            });

            $scope.eatAddSubmit = function (data) {
                var animalEat = new AnimalsEats();

                animalEat.animal_id = parseInt($routeParams.id);
                animalEat.eat_id = data.eat;
                animalEat.eat_volume = data.volume;

                animalEat.$save(function (eat) {
                    $scope.animal.eats.push(eat);
                });
            };

            $scope.removeEat = function (i, animalEatId) {
                ConfirmService.remove(function (confirm) {
                    if (!confirm) {
                        return;
                    }

                    $scope.animal.eats[i].deleting = true;

                    AnimalsEats.remove({
                        id: animalEatId
                    }, function () {
                        $scope.animal.eats.splice(i, 1);
                    });
                });
            };
        }
    ]);