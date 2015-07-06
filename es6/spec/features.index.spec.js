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
