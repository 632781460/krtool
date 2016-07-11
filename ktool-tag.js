'use strict';

const conventionalChangelog = require('conventional-changelog');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const rootPath = findRoot(process.cwd());
const CHANGE_LOG = 'CHANGELOG.md';
const pkgPath = path.join(rootPath, 'package.json');
const pkg = require(pkgPath);
const q = require('q');
const semver = require('semver');
const deferred = q.defer();
const promise = deferred.promise;
const git = require('simple-git')(rootPath);
const jsonfile = require('jsonfile');
const program = require('commander');

program.option('-t, --tag', '发布的标签')
.parse(process.argv);

let changelogPath = path.join(rootPath, CHANGE_LOG);
let changelogStream = fs.createWriteStream(changelogPath);

conventionalRecommendedBump({
    preset: 'angular'
}, function (err, result) {
    var version = semver.inc(pkg.version, result.releaseAs);
    deferred.resolve(version);
});

promise.then(makeChangelog);

// function hotfix() {
//     git.checkoutBranch('hotfix', 'v' + pkg.version);
// }

function makeChangelog(version) {
    var argVersion = program.args.toString() || '';
    if (argVersion && !semver.valid(argVersion)) {
        console.log('不合法的版本：%s', argVersion);
        process.exit(1);
    }

    if (argVersion && semver.gt(version, argVersion)) {
        console.log('当前版本：%s 小于已有版本：%s', argVersion, version);
        process.exit(1);
    }

    version = argVersion || version;
    console.log('version: %s', version);
    var logStream = conventionalChangelog({
    preset: 'angular',
    releaseCount: 0,
	}, {
    version: version
	});
    logStream.pipe(changelogStream);
    logStream.on('end', function pipeEnd() {
        console.log('changelog: %s', CHANGE_LOG);
        git.add(CHANGE_LOG)
        .commit('docs(CHANGELOG): ' + version, CHANGE_LOG);
        addTag(version);
    });
}

function addTag(version) {

    pkg.version = version;
    jsonfile.writeFileSync(pkgPath, pkg, {
        spaces: 2,
        replacer: null
    });
    console.log('tag: v%s', version);
    git.commit('chore(release): ' + version, pkgPath)
    .addAnnotatedTag('v' + version, 'v' + version);
}
