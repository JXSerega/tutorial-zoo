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