#!/usr/bin/env node

const program = require('commander');
const findRoot = require('find-root');
const path = require('path');
const rootPath = findRoot(process.cwd());
const pkgPath = path.join(rootPath, 'package.json');
const pkg = require(pkgPath);
program.version(pkg.version)
	.command('hotfix', '从最新的tag打出fix分支')
	.command('tag [tag]', '生成发布标签，CHANGELOG')
	.parse(process.argv);

