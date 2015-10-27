var CleanCSS = require('clean-css');

var pkg = require('./package.json');

module.exports = function(options, callback) {
  var context = this;
  var contents = context.contents.toString();

  if (!contents.trim()) {
    return callback();
  }

  try {
    context.contents = new Buffer(
      new CleanCSS(options).minify(contents).styles
    );
  } catch (err) {
    return callback(err);
  }

  callback();
};

module.exports.toString = function() {
  return [pkg.name, pkg.version].join('@');
};
