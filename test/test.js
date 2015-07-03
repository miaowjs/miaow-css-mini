var assert = require('assert');
var fs = require('fs-extra');
var miaow = require('miaow');
var path = require('path');

var parse = require('../index');
describe('miaow-css-mini', function () {
  this.timeout(10e3);

  var log;

  var cwd = path.resolve(__dirname, './fixtures');
  var output = path.resolve(__dirname, './output');

  function doCompile(cb) {
    miaow.compile({
      cwd: cwd,
      output: output,
      pack: false,
      module: {
        tasks: [
          {
            test: /\.css$/,
            plugins: [{
              plugin: parse,
              option: {
                compatibility: 'ie7'
              }
            }]
          }
        ]
      }
    }, function (err) {
      if (err) {
        console.error(err.toString());
        throw err;
      }

      log = JSON.parse(fs.readFileSync(path.join(output, 'miaow.log.json')));
      cb();
    });
  }

  before(function (done) {
    fs.emptyDirSync(output);
    doCompile(done);
  });

  it('接口是否存在', function () {
    assert(!!parse);
  });

  it('压缩', function () {
    var stat = fs.statSync(path.join(output, 'foo.css'));
    assert.equal(stat.size, 56);
  });

  it('缓存', function (done) {
    var fooPath = path.join(output, 'foo.css');
    fs.writeFileSync(fooPath, '/* load cache */');

    doCompile(function () {
      assert.equal(fs.readFileSync(fooPath, {encoding: 'utf8'}), '/* load cache */');
      done();
    });
  });
});
