const shell = require('shelljs');
const Enumerable = require('linq');


function getRelativePath(file, sourceDir) {
    return file.replace(sourceDir, '');
}

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
        console.log('--- excluded ---');
        excluded.forEach(f => console.log(f));
        console.log('--- copying ... ---');
        let allfiles = shell.find(sourcedir);

        let filesToCopy = Enumerable.from(allfiles).where(f => !this.isExcluded(excluded, f)).toArray();
        filesToCopy.forEach(function (file) {
            let relative = getRelativePath(file, sourcedir);
            let target = targetdir + relative;
            let lastSlash = target.lastIndexOf("/");
            if (lastSlash !== -1) {
                shell.mkdir('-p', target.substr(0, lastSlash));
            }
            console.log(relative);
            shell.cp('-u', file, target);
        });

        console.log('--- done copying ---');
    }
};