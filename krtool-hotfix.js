const findRoot = require('find-root');
const rootPath = findRoot(process.cwd());
const git = require('simple-git')(rootPath);
const semver = require('semver');
const program = require('commander');
program.parse(process.argv);
checkoutFix();
function checkoutFix() {
    git.fetch()
    .tags(function listTags(err, tags) {
        tags = tags.all || [];
        tags.reverse();
        const INIT_VERSION = '0.0.0';
        var tag = INIT_VERSION;
        for (var i = 0, l = tags.length; i < l; i++) {
            if (semver.valid(tags[i]) && semver.gt(tags[i], tag)) {
                tag = tags[i];
            }
        }

        if (tag === INIT_VERSION) {
            tag = 'master';
        }

        var krfix = program.args[0] || 'krfix';
        git.checkoutBranch(krfix, tag);
    });
}
