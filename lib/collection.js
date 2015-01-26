'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

exports.merge = function(dependencies, currentDependencies, source, type) {
    var key;

    if (!currentDependencies) {return;}

    for (key in currentDependencies) {
        if (currentDependencies.hasOwnProperty(key)) {
            dependencies.push({
                source: source,
                type: type,
                name: key,
                value: currentDependencies[key]
            });
        }
    }
};

exports.createMerger = function(dependencies) {
    return exports.merge.bind(null, dependencies);
};
