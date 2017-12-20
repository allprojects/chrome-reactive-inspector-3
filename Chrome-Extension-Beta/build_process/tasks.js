const shell = require('shelljs');
const Enumerable = require('linq');

module.exports = {

    isInPath: function isInPath(path, fileOrDirectoryName) {
        let parts = path.split('/');
        return Enumerable.from(parts).any(p => p === fileOrDirectoryName);
    },

    isExcluded: function isExcluded(excluded, path) {
        return Enumerable.from(excluded).any(e => this.isInPath(path, e));
    },

    clear: function (targetdir) {
        console.log('clearing "' + targetdir + '"');
        shell.rm('-r', targetdir + '*');
        shell.mkdir('-p', targetdir);
    },

    copyToTarget: function (sourcedir, targetdir, excluded) {
        let allfiles = shell.ls('-A', sourcedir);

        console.log('--- excluded ---');
        excluded.forEach(f => console.log(f));


        let filesToCopy = Enumerable.from(allfiles).where(f => !this.isExcluded(excluded, f)).toArray();
        shell.cp('-ru', filesToCopy.map(f => sourcedir + f), targetdir);

        console.log('--- copied ---');
        filesToCopy.forEach(f => console.log(f));
    }
};