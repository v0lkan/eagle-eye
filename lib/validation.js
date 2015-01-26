'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var urlRegExp = /^https?:/,
    githubUrlRegExp = /^https:\/\/github\.com/;

exports.isUrl = function(value) {
    return urlRegExp.test(value);
};

exports.isGithubUrl = function(value) {
    return githubUrlRegExp.test(value);
};
