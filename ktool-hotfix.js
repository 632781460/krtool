const findRoot = require('find-root');
const rootPath = findRoot(process.cwd());
const git = require('simple-git')(rootPath);
const semver = require('semver');
checkoutFix();
function checkoutFix() {
    git.tags(function listTags(err, tags) {
        tags = tags.all || [];
        tags.reverse();
        var tag = 'master';
        for (var i = 0, l = tags.length; i < l; i++) {
            if (semver.valid(tags[i])) {
                tag = tags[i];
                break;
            }
        }

        git.checkoutBranch('_hotfix', tag);
    });
}
