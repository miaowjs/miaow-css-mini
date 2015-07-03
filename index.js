var CleanCSS = require('clean-css');

function minify(option, cb) {
  // 如果有缓存就用缓存内容
  var cachedContents = this.getCachedContentsSync();
  if (cachedContents) {
    this.destContents = cachedContents;
    return cb();
  }

  this.contents = new Buffer(
    new CleanCSS(option).minify(this.contents.toString()).styles
  );
  cb();
}

module.exports = minify;
