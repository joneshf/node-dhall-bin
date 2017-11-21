'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var packageJSON = require('./package.json');

var base = 'https://github.com/dhall-lang/dhall-haskell/releases/download/';

var binary = new BinWrapper({skipCheck: true})
  .src(base + packageJSON.version + '/osx.tar.gz', 'darwin')
  .src(base + packageJSON.version + '/linux.tar.gz', 'linux')
  .dest(path.join(__dirname, 'vendor'));

binary.use('dhall').run(function(err) {
  if (err != null) {
    console.error(err);
    process.exit(1);
  }

  console.log('dhall installed successfully');
  binary.use('dhall-format').run(function(err) {
    if (err != null) {
      console.error(err);
      process.exit(1);
    }

    console.log('dhall-format installed successfully');
    binary.use('dhall-hash').run(function(err) {
      if (err != null) {
        console.error(err);
        process.exit(1);
      }

      console.log('dhall-hash installed successfully');
    });
  });
});
