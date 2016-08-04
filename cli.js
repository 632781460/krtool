#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const pkgPath = path.join(__dirname, 'package.json');
const pkg = require(pkgPath);
program.version(pkg.version)
    .command('branch <branch>', '从最新的tag打出feature分支').alias('f')
    .command('hotfix <branch>', '从最新的tag打出fix分支').alias('h')
    .command('tag <tag>', '生成发布标签，CHANGELOG').alias('t')
    .parse(process.argv);

