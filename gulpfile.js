// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('require-dir')('build/tasks');
var gulp = require("gulp");
var fs = require("fs");
var yargs = require('yargs');
var runSequence = require('run-sequence');
var syncfusionJavscript = yargs.argv.syncfusion;
var aureliaSyncfusion = yargs.argv.bridge;
gulp.task('config', function () {
  var regExp = [/"aurelia-syncfusion-bridge": "npm:aurelia-syncfusion-bridge@[0-9]*.[0-9]*.[0-9]*",/, /"syncfusion-javascript": "npm:syncfusion-javascript@[0-9]*.[0-9]*.[0-9]*",/, /"npm:aurelia-syncfusion-bridge@[0-9]*.[0-9]*.[0-9]*": \{([^}]+)\},/, /"npm:syncfusion-javascript@[0-9]*.[0-9]*.[0-9]*": \{([^}]+)\},/, /syncfusion-ej-global@[0-9]*.[0-9]*.[0-9]*/];
  var replace =['','','','',"syncfusion-ej-global@"+syncfusionJavscript]
 for (let i = 0; i < regExp.length; i++) {
    var file = fs.readFileSync("./config.js");
    var data = file.toString()
    var result = data.replace(regExp[i], replace[i]);
    fs.writeFileSync("./config.js", result);
  }
});
gulp.task('package', function () {
  var pkg = [/"syncfusion-javascript": "npm:syncfusion-javascript@\^[0-9]*.[0-9]*.[0-9]*"/, /"aurelia-syncfusion-bridge": "npm:aurelia-syncfusion-bridge@\^[0-9]*.[0-9]*.[0-9]*"/];
  var versionChange = ["\"syncfusion-javascript\": \"npm:syncfusion-javascript@^" + syncfusionJavscript + "\"", "\"aurelia-syncfusion-bridge\": \"npm:aurelia-syncfusion-bridge@^" + aureliaSyncfusion + "\""];
  for (i = 0; i < pkg.length; i++) {
    var file = fs.readFileSync("./package.json");
    var data = file.toString();
    var result = data.replace(pkg[i], versionChange[i]);
    fs.writeFileSync("./package.json", result);
  }
});
gulp.task('run', function() {
  runSequence('package', 'config');
});