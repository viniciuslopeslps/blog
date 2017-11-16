var assert = require('assert');
var moment = require("moment");
var timeService = require("../../app/services/timeService.js");

describe('time service class', () => {

    describe('#findLastMonths()', ()=> {
        it('should return the lasts five months', function () {
            assert.equal(timeService.lastMonths[0].dateVew, 'November / 2017');
            assert.equal(timeService.lastMonths[0].month, '11');

            assert.equal(timeService.lastMonths[1].dateVew, 'October / 2017');
            assert.equal(timeService.lastMonths[1].month, '10');
            
            assert.equal(timeService.lastMonths[2].dateVew, 'September / 2017');
            assert.equal(timeService.lastMonths[2].month, '09');
            
            assert.equal(timeService.lastMonths[3].dateVew, 'August / 2017');
            assert.equal(timeService.lastMonths[3].month, '08');
            
            assert.equal(timeService.lastMonths[4].dateVew, 'July / 2017');
            assert.equal(timeService.lastMonths[4].month, '07');
            
        });
    });
});