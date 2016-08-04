'use strict';
const git = require('simple-git')(process.cwd());
var utls = require('./utls');

git.tags(function getCurrentBranch(err, tags) {
    tags = tags.all || [];
    var maxTag = utls.getMaxTag(tags);
    git.push().push('origin', maxTag, function tagPushed() {
        console.log(maxTag);
    });
});
