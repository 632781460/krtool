const findRoot = require('find-root');
const rootPath = findRoot(process.cwd());
const git = require('simple-git')(rootPath);
const program = require('commander');
const utls = require('./utls');
program.parse(process.argv);
checkoutFix();
function checkoutFix() {
    git.fetch()
    .tags(function listTags(err, tags) {
        tags = tags.all || [];
        var tag = utls.getMaxTag(tags);
        if (tag === utls.INIT_VERSION) {
            tag = 'master';
        }

        var krfix = program.args[0] || 'krfix';
        git.checkoutBranch(krfix, tag);
    });
}
