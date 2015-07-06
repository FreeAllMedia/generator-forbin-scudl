const path = require("path");
const assert = require("yeoman-generator").assert;
const helpers = require("yeoman-generator").test;
const os = require("os");

describe("forbin-scudl:features", () => {
  let name;

  before((done) => {
    name = "model";
    helpers.run(path.join(__dirname, "../../generators/features"))
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

  it("creates feature files", () => {
    assert.file([
      `features/${name}/${name}Controller.show.feature`,
      `features/${name}/${name}Controller.create.feature`,
      `features/${name}/${name}Controller.update.feature`,
      `features/${name}/${name}Controller.delete.feature`,
      `features/${name}/${name}Controller.list.feature`
    ]);
  });
});
