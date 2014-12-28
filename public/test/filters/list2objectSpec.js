/*jshint -W117 */

describe('Filter: list2object', function() {
    var list2objectFilter,
        list1, list2,
        obj1, obj2;

    beforeEach(module('ZooApp'));
    beforeEach(inject(function (_list2objectFilter_) {
        list2objectFilter = _list2objectFilter_;
    }));

    list1 = [
        { id: 2, name: 'The creature is pedantically vital.' },
        { id: 4, name: 'Love, riddle, and desolation.' }
    ];

    list2 = [
        { custom_id: 51, title: 'Teachers, things, and unprepared gurus will always protect them.' },
        { custom_id: 10, title: 'Krakens travel on greed at isla de sangria!' }
    ];

    obj1 = {
        2: { id: 2, name: 'The creature is pedantically vital.' },
        4: { id: 4, name: 'Love, riddle, and desolation.' }
    };

    obj2 = {
        51: { custom_id: 51, title: 'Teachers, things, and unprepared gurus will always protect them.' },
        10: { custom_id: 10, title: 'Krakens travel on greed at isla de sangria!' }
    };

    it('list not array', function () {
        expect(list2objectFilter(null)).toEqual(null);
        expect(list2objectFilter(undefined)).toEqual(undefined);
        expect(list2objectFilter('')).toEqual('');
        expect(list2objectFilter(0)).toEqual(0);
        expect(list2objectFilter(true)).toEqual(true);
        expect(list2objectFilter(false)).toEqual(false);
        expect(list2objectFilter({})).toEqual({});
    });

    it('list array', function () {
        expect(list2objectFilter([])).toEqual({});
        expect(list2objectFilter(list1)).toEqual(obj1);
        expect(list2objectFilter(list2, 'custom_id')).toEqual(obj2);
        expect(function () {
            list2objectFilter(list2, 'param_not_found');
        }).toThrow(new TypeError('List not exist key'));
    });
});