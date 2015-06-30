var CleanCSS = require('clean-css');

function minify(option, cb) {
  this.contents = new Buffer(
    new CleanCSS(option).minify(this.contents.toString()).styles
  );
  cb();
}

module.exports = minify;
