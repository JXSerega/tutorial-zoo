angular
    .module('ZooApp', [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'mgcrea.ngStrap',
        'angular-growl',
        'cgBusy',
        'ui.select',
        'angular-loading-bar',
        'oitozero.ngSweetAlert',
        'simplePagination',
        'ZooAppResources'
    ])
    .config([
        '$routeProvider', '$locationProvider', 'uiSelectConfig', '$asideProvider', '$tooltipProvider',
        function($routeProvider, $locationProvider, uiSelectConfig, $asideProvider, $tooltipProvider){
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {
                    title: 'Главная',
                    templateUrl: '/src/templates/overview.html',
                    controller: 'OverviewCtrl'
                })
                .when('/animals/:id', {
                    title: 'Животное',
                    templateUrl: '/src/templates/animal.html',
                    controller: 'AnimalCtrl'
                })
                .otherwise({ redirectTo: '/' });

            uiSelectConfig.theme = 'bootstrap';

            angular.extend($asideProvider.defaults, {
                animation: 'am-fade-and-slide-left',
                placement: 'left',
                container: 'body',
                keyboard: false,
                backdrop: 'static'
            });

            angular.extend($tooltipProvider.defaults, {
                container: 'body'
            });
        }
    ])
    .value('cgBusyDefaults', {
        message: 'Загрузка'
    })
    .run([
        '$rootScope',
        function($rootScope){
            $rootScope.$on('$routeChangeSuccess', function(event, current){
                $rootScope.title = current.$$route.title;
            });
        }
    ]);

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

angular
    .module('ZooApp')
    .directive('canChange', [function(){
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: '/src/templates/modules/directives/can-change.html'
        };
    }]);

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

angular
    .module('ZooApp')
    .filter('list2object', [function(){
        return function(list, key){
            if (!list || !angular.isArray(list)) {
                return list;
            }

            var result, i, len;

            if (typeof key === 'undefined' || key === null) {
                key = 'id';
            }

            i = 0;
            len = list.length;
            result = {};

            for (; i < len; i++) {
                if (!list[i].hasOwnProperty(key)) {
                    throw new TypeError('List not exist key');
                }

                result[ list[i][key] ] = list[i];
            }

            return result;
        };
    }]);


angular
    .module('ZooApp')
    .filter('pageDot', [function(){
        return function(active, type, numPages){
            if (typeof active === 'undefined' || active === null ||
                typeof type === 'undefined' || type === null ||
                typeof numPages === 'undefined' || numPages === null)
            {
                return false;
            }

            if (numPages <= 5) {
                return false;
            }

            switch (type) {
                case 'before':

                    if (active > 2) {
                        return true;
                    }

                    break;

                case 'after':

                    if (active < numPages - 3) {
                        return true;
                    }

                    break;

                default:

                    throw new TypeError('Page dot invalid type');
            }

            return false;
        };
    }]);

angular
    .module('ZooApp')
    .filter('pagesList', [function(){
        return function(page, active, numPages){
            if (typeof page === 'undefined' || page === null ||
                typeof active === 'undefined' || active === null ||
                typeof numPages === 'undefined' || numPages === null)
            {
                return false;
            }

            if (numPages <= 5 || page === active) {
                return true;
            }

            if (active < 3 && page < 5) {
                return true;
            }

            if (active > numPages - 3 && page > numPages - 6) {
                return true;
            }

            var periodBefore, periodAfter;

            periodBefore = active - 3;
            periodAfter = active + 3;

            if (periodBefore < page && page < periodAfter) {
                return true;
            }

            return false;
        };
    }]);

angular
    .module('ZooApp')
    .filter('units', [function(){
        var units = {
            1: 'шт',
            2: 'мл',
            3: 'гр'
        };

        return function(unit){
            if (typeof unit === 'undefined' || unit === null) {
                return unit;
            }

            if (typeof units[ unit ] === 'undefined') {
                return undefined;
            }

            return units[ unit ];
        };
    }]);

angular
    .module('ZooAppResources', ['ngResource'])
    .factory('Animals', ['$resource', function($resource){
        return $resource('/api/animals/:id');
    }])
    .factory('AnimalsEats', ['$resource', function($resource){
        return $resource('/api/animals/:animal_id/eats/:id');
    }])
    .factory('Eats', ['$resource', function($resource){
        return $resource('/api/eats/:id');
    }]);

angular
    .module('ZooApp')
    .service('ConfirmService', ['SweetAlert', function(SweetAlert){
        return {
            remove: function(callback){
                SweetAlert.swal({
                    title: 'Вы уверены что хотите удалить?',
                    //text: 'Данные будут удалены безвозвратно!',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Отмена',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Да, уверен'
                }, function (confirm) {
                    if (callback) {
                        callback(confirm);
                    }
                });
            }
        };
    }]);
