var assert = require('assert');
var moment = require("moment");
var timeService = require("../../app/services/timeService.js");

describe('time service class', () => {

    describe('findLastMonthsTest', () => {
        it('should return the lasts five months', function () {
            assert.equal(timeService.lastMonths[0].dateVew, moment().format('MMMM / YYYY'));
            assert.equal(timeService.lastMonths[0].month, moment().format('MM'));

            assert.equal(timeService.lastMonths[1].dateVew, moment().subtract(1, 'months').format('MMMM / YYYY'));
            assert.equal(timeService.lastMonths[1].month, moment().subtract(1, 'months').format('MM'));
            
            assert.equal(timeService.lastMonths[2].dateVew, moment().subtract(2, 'months').format('MMMM / YYYY'));
            assert.equal(timeService.lastMonths[2].month, moment().subtract(2, 'months').format('MM'));
            
            assert.equal(timeService.lastMonths[3].dateVew, moment().subtract(3, 'months').format('MMMM / YYYY'));
            assert.equal(timeService.lastMonths[3].month, moment().subtract(3, 'months').format('MM'));
            
            assert.equal(timeService.lastMonths[4].dateVew, moment().subtract(4, 'months').format('MMMM / YYYY'));
            assert.equal(timeService.lastMonths[4].month, moment().subtract(4, 'months').format('MM'));
        });
    });
});