'use strict';

var regExp = /%s/;

// TODO: use o2.string when it’s ready.
exports.printf = function(str) {
    var index = 1;

    while (arguments[index] !== undefined) {
        str = str.replace(regExp, arguments[index]);

        index++;
    }

    return str;
};
