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