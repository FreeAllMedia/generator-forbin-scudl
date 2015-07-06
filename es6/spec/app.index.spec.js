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

  it("creates step files", () => {
    assert.file([
      `features/steps/${name}/${name}Controller.common.steps.js`,
      `features/steps/${name}/${name}Controller.show.steps.js`,
      `features/steps/${name}/${name}Controller.create.steps.js`,
      `features/steps/${name}/${name}Controller.update.steps.js`,
      `features/steps/${name}/${name}Controller.delete.steps.js`,
      `features/steps/${name}/${name}Controller.list.steps.js`
    ]);
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

  describe("(about the content of every feature)", () => {
    it("should have some this.querySpy = on it", () => {
      assert.fileContent([[`features/steps/${name}/${name}Controller.show.steps.js`, "this.querySpy ="]]);
    });
  });
});
