"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("forbin-scudl:features", function () {
  var name = undefined;

  before(function (done) {
    name = "model";
    helpers.run(path.join(__dirname, "../../generators/features")).inDir(path.join(os.tmpdir(), "./temp-test")).withOptions({ "skip-install": true }).withPrompts({
      name: name
    }).on("end", done);
  });

  it("creates feature files", function () {
    assert.file(["features/" + name + "/" + name + "Controller.show.feature", "features/" + name + "/" + name + "Controller.create.feature", "features/" + name + "/" + name + "Controller.update.feature", "features/" + name + "/" + name + "Controller.delete.feature", "features/" + name + "/" + name + "Controller.list.feature"]);
  });
});