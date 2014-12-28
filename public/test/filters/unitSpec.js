/*jshint -W117 */

describe('Filter: unit', function() {
    var unitsFilter;

    beforeEach(module('ZooApp'));
    beforeEach(inject(function (_unitsFilter_) {
        unitsFilter = _unitsFilter_;
    }));

    it('type not set', function () {
        expect(unitsFilter(null)).toEqual(null);
        expect(unitsFilter(undefined)).toEqual(undefined);
    });

    it('type not found unit number', function () {
        expect(unitsFilter(-1)).toEqual(undefined);
        expect(unitsFilter(0)).toEqual(undefined);
        expect(unitsFilter(4)).toEqual(undefined);
    });

    it('type exist', function () {
        expect(unitsFilter(1)).toEqual('шт');
        expect(unitsFilter(2)).toEqual('мл');
        expect(unitsFilter(3)).toEqual('гр');
    });
});