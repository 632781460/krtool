#!/usr/bin/env node

const program = require('commander');
const findRoot = require('find-root');
const path = require('path');
const rootPath = findRoot(process.cwd());
const pkgPath = path.join(rootPath, 'package.json');
const pkg = require(pkgPath);
program.version(pkg.version)
	.command('branch <branch>', '从最新的tag打出feature分支').alias('f')
	.command('hotfix <branch>', '从最新的tag打出fix分支').alias('h')
	.command('tag <tag>', '生成发布标签，CHANGELOG').alias('t')
	.parse(process.argv);

