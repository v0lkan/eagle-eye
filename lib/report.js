'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var Q = require('q'),
    path = require('path'),

    io = require('./io'),
    processing = require('./processing'),
    collection = require('./collection'),
    string = require('./string'),
    clc = require('cli-color');

exports.process = function(sourceDir) {
    var bowerPath = path.join(sourceDir, 'bower.json'),
        packagePath = path.join(sourceDir, 'package.json');

    Q.all([
        io.readFile(bowerPath),
        io.readFile(packagePath)
    ]).spread(function(bowerJson, packageJson) {
        var dependencies = [],

            merge = collection.createMerger(dependencies),

            bower = bowerJson || {},
            npm = packageJson || {};

        merge(bower.dependencies, 'bower', 'production');
        merge(npm.dependencies, 'npm',   'production');
        merge(bower.devDependencies, 'bower', 'development');
        merge(npm.devDependencies, 'npm', 'production');

        var total = dependencies.length,
            failed = 0;

        return processing.check(dependencies).then(function(promises) {
            promises.forEach(function(promise) {
                if (promise.state === 'fulfilled') {
                    return;
                }

                failed++;
            });
        }).then(function() {
            console.log(clc.green('All done!'));
            console.log(
                string.printf(
                    clc.red('%s of %s dependencies failed the inspection.'),
                    failed, total
                )
            )
        });
    }).fail(function(reason) {
        console.error(clc.red('Execution failed: ' + reason));
    });
};
