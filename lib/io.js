'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var fs = require('fs'),
    Q = require('q');

exports.readFile = function(pathName) {
    var deferred = Q.defer();

    fs.readFile(pathName, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            void err;

            deferred.resolve(null);

            return;
        }

        var parsed;

        try {
            parsed = JSON.parse(data);
        } catch(ignore) {
            deferred.reject('ParseError: ' + pathName);

            return;
        }

        deferred.resolve(parsed);
    });

    return deferred.promise;
};
