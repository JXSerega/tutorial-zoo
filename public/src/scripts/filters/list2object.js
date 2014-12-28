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
