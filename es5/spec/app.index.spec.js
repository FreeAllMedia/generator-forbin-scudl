"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("forbin-scudl", function () {
  var name = undefined;

  before(function (done) {
    name = "model";
    helpers.run(path.join(__dirname, "../../generators/app")).inDir(path.join(os.tmpdir(), "./temp-test")).withOptions({ "skip-install": true }).withPrompts({
      name: name
    }).on("end", done);
  });

  it("creates the fixture file", function () {
    assert.file(["spec/fixtures/" + name + "s.json"]);
  });

  it("creates the controller", function () {
    assert.file(["app/controllers/" + name + "Controller.js"]);
  });
});