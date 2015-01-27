'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var program = require('commander'),

    report = require('./report');

function run() {
    program
        .version('0.1.0')
        .option('' +
            '-t, ' +
            '--target [targetDir]',
            'Add the specified type of cheese [targetDir]',
            './'
        )
        .parse(process.argv);

    var target = program.target;

    if (!target) {
        console.error(
            'Please provide the target directory with `-t pathToDir`.'
        );
    }

    report.process(target);
}

// TODO: find a way not to run if the module locally installed;
// maybe introduce a second entry point.
run();
