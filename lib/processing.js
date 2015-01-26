'use strict';

/*
 * Eagle Eye — https://github.com/v0lkan/eagle-eye
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var Q = require('q'),
    bower = require('bower'),
    npm = require('npm'),
    request = require('request'),

    validation = require('./validation'),
    tags = require('./tags'),
    satisfaction = require('./satisfaction');

exports.check = function(dependencies) {
    var promises = [];

    dependencies.forEach(function(meta) {
        var value = meta.value,
            tagsUrl,
            deferred = Q.defer();

        promises.push(deferred.promise);

        if (validation.isUrl(value)) {
            if (validation.isGithubUrl(value)) {
                tagsUrl = tags.getFromGithubUrl(value);

                if (!tagsUrl) {
                    deferred.reject({meta: meta});

                    return;
                }

                // TODO: github api has rate limit, use an auth mechanism.
                request({
                    url: tagsUrl,
                    headers: {
                        'User-Agent': 'eagle-eye'
                    }
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var json;

                        try {
                            json = JSON.parse(body);
                        } catch(ignore) {
                            deferred.reject({meta: meta});

                            return;
                        }

                        deferred.resolve({meta: meta, json: json});

                        return;
                    }

                    deferred.reject({meta: meta, json: json});
                });

                return;
            }

            deferred.reject({meta: meta});

            return;
        }

        // For signature parity.
        var json = {};

        if (meta.source === 'bower') {
            bower.commands.info(meta.name)
                .on('end', function(results) {
                    var localVersion = meta.value,
                        remoteVersion = results.versions[0],
                        satisfied = false;

                    if (localVersion !== remoteVersion) {
                        satisfied = satisfaction.check(meta.name, meta.source, localVersion, remoteVersion);

                        if (satisfied) {
                            deferred.resolve({meta: meta, json: json});

                            return;
                        }

                        deferred.reject({meta: meta, json: json});

                        return;
                    }

                    deferred.resolve({meta: meta, json: json});
                });

            return;
        }

        if (meta.source === 'npm') {
            npm.load({}, function (er) {
                if (er) {
                    console.log('Bummer');

                    deferred.reject({meta: meta, json: json});

                    return;
                }

                // `true` to keep npm CLI silent.
                npm.commands.info([meta.name], true, function (er, data) {
                    var satisfied = false;

                    if (er) {
                        deferred.reject({meta: meta, json: json});

                        return;
                    }

                    var key, distTags;

                    if (!data) {
                        deferred.reject({meta: meta, json: json});

                        return;
                    }

                    for (key in data) {
                        if (data.hasOwnProperty(key)) {
                            data = data[key];

                            break;
                        }
                    }

                    distTags = data['dist-tags'];

                    if (!distTags) {
                        deferred.reject({meta: meta, json: json});

                        return;
                    }


                    if (!distTags.latest) {
                        deferred.reject({meta: meta, json: json});

                        return;
                    }

                    satisfied = satisfaction.check(meta.name, 'npm', meta.value, distTags.latest);

                    if (satisfied) {
                        deferred.resolve({meta: meta, json: json});

                        return;
                    }

                    deferred.reject({meta: meta, json: json});
                });
            });

            return;
        }

        console.log(meta.source);

        deferred.reject({meta: meta});
    });

    return Q.allSettled(promises);
};
