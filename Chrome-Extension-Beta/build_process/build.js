const shell = require('shelljs');
const Enumerable = require('linq');
const tasks = require('./tasks');

const sourcedir = '../ChromeReactiveInspector/';
const targetdir = '../dist/';

const excluded = [
    '.idea',
    '.gitignore',
    '_jalangi-framework-with-comments.js',
    'underscore-min.map',
    '.git',
    'ChromeReactiveInspector.pem',
    '_filenameHookSnippet.js'];

(function build() {
    tasks.clear(targetdir);
    tasks.copyToTarget(sourcedir, targetdir, excluded);
})();






