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