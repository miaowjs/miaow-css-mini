var CleanCSS = require('clean-css');
var mutil = require('miaow-util');

var pkg = require('./package.json');

var minify = mutil.plugin(pkg.name, pkg.version, function (option, cb) {
  var contents = this.contents.toString();
  if (!contents.trim()) {
    return cb();
  }

  // 如果有缓存就用缓存内容
  var hash = mutil.hash(contents);
  var cachedContents = this.getCache(minify.toString(), hash);
  if (cachedContents) {
    this.contents = cachedContents;
    return cb();
  }

  this.contents = new Buffer(
    new CleanCSS(option).minify(contents).styles
  );
  // 缓存压缩结果
  this.addCache(minify.toString(), hash, this.contents);
  cb();
});

module.exports = minify;
