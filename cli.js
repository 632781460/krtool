#!/usr/bin/env node

'use strict';

const conventionalChangelog = require('conventional-changelog');
const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const CHANGE_LOG = 'CHANGELOG.md';

let rootPath = findRoot(process.cwd());
let changelogPath = path.join(rootPath, CHANGE_LOG);
let changelogStream = fs.createWriteStream(changelogPath);

console.log(changelogPath);
conventionalChangelog({
    preset: 'angular',
    releaseCount: 1,
    append: true
}).pipe(changelogStream);
