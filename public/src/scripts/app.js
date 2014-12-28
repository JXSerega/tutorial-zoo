angular
    .module('ZooApp', [
        //'ngMock',
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