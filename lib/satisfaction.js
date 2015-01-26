'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var clc = require('cli-color'),
    semver = require('semver'),

    string = require('./string');

exports.check = function(packageName, environment, localVersion, remoteVersion) {
    if (localVersion === '*') {
        console.log(
            string.printf(
                clc.green('%s') +
                clc.red(' has a wildcard local version (%s), and it is dangerous. Please be more specific!')
                ,
                packageName, localVersion
            )
        );

        return false;
    }

    if (!semver.satisfies(remoteVersion, localVersion)) {
        console.log(
            string.printf(
                clc.red('%s') +
                ' has a local version (%s); and there’s a newer/brighter/better version (%s) at ' +
                clc.yellow('%s') + '.',
                packageName, localVersion, remoteVersion, environment
            )
        );

        return false;
    }

    return true;
};
