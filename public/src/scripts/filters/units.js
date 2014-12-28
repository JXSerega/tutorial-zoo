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