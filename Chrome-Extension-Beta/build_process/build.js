const shell = require('shelljs');
const Enumerable = require('linq');
const tasks = require('./tasks');

const sourcedir = '../ChromeReactiveInspector/';
const targetdir = '../dist/';

const excluded = [
    '.idea',
    '.gitignore'];

(function build() {
    tasks.clear(targetdir);
    tasks.copyToTarget(sourcedir, targetdir, excluded);
})();






