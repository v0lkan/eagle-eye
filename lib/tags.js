'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var tagsRegExp = /^https:\/\/github\.com\/(.*?)$/;

exports.getFromGithubUrl = function(githubUrl) {
    var matches = tagsRegExp.exec(githubUrl),
        text, index;

    if (!matches) {return null;}

    text = matches[1];
    index = text.indexOf('/archive');

    if (index > -1) {
        text = text.substring(0, index);
    }

    return 'https://api.github.com/repos/' + text + '/tags';
};
