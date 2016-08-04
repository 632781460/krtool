#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const pkgPath = path.join(__dirname, 'package.json');
const pkg = require(pkgPath);
program.version(pkg.version)
    .command('branch <branch>', '从最新的tag打出feature分支')
    .command('hotfix <branch>', '从最新的tag打出fix分支')
    .command('tag <tag>', '生成发布标签，CHANGELOG')
    .command('push', '推送分支和标签')
    .parse(process.argv);

