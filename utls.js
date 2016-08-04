var utls = {};
const semver = require('semver');
const INIT_VERSION = '0.0.0';
utls.getMaxTag = getMaxTag;
utls.INIT_VERSION = INIT_VERSION;

module.exports = utls;

function getMaxTag(tags) {
    var tag = INIT_VERSION;
    for (var i = 0, l = tags.length; i < l; i++) {
        if (semver.valid(tags[i]) && semver.gt(tags[i], tag)) {
            tag = tags[i];
        }
    }

    return tag;
}
