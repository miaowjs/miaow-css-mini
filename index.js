var CleanCSS = require('clean-css');
var mutil = require('miaow-util');

var pkg = require('./package.json');

function minify(option, cb) {
  var contents = this.contents.toString();
  if (!contents.trim()) {
    return cb();
  }

  // 如果有缓存就用缓存内容
  var cachedContents = this.getCachedContentsSync();
  if (cachedContents) {
    this.destContents = cachedContents;
    return cb();
  }

  this.contents = new Buffer(
    new CleanCSS(option).minify(contents).styles
  );
  cb();
}

module.exports = mutil.plugin(pkg.name, pkg.version, minify);
