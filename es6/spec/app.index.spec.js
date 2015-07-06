const path = require("path");
const assert = require("yeoman-generator").assert;
const helpers = require("yeoman-generator").test;
const os = require("os");

describe("forbin-scudl", () => {
  let name;

  before((done) => {
    name = "model";
    helpers.run(path.join(__dirname, "../../generators/app"))
      .inDir(path.join(os.tmpdir(), "./temp-test"))
      .withOptions({ "skip-install": true })
      .withPrompts({
        name: name
      })
      .on("end", done);
  });

  it("creates the fixture file", () => {
    assert.file([
      `spec/fixtures/${name}s.json`
    ]);
  });

  it("creates the controller", () => {
    assert.file([
      `app/controllers/${name}Controller.js`
    ]);
  });
});
