var moment = require("moment");

function findLastMonths() {
    var lastMonths = [];
    for (var i = 0; i <= 4; i++) {
        var date = moment().subtract(i, 'months');
        var dateObj = {
            dateVew: date.format('MMMM / YYYY'),
            month: date.format('MM'),
            year: date.format('YYYY')
        };
        lastMonths.push(dateObj);
    }
    return lastMonths;
}

module.exports = {
    lastMonths: findLastMonths()
}