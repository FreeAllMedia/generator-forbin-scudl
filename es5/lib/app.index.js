"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jargon = require("jargon");

var _jargon2 = _interopRequireDefault(_jargon);

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay("Welcome to the stylish " + chalk.red("FamScudl") + " generator! our base path is " + this.destinationRoot()));

		var prompts = [{
			type: "input",
			name: "name",
			message: "What is the model name? (use camel case please)",
			"default": "myModel"
		}];

		this.prompt(prompts, (function (props) {
			this.props = props;

			done();
		}).bind(this));
	},

	writing: function yoWriting() {
		var _this = this;

		var context = {
			name: this.props.name,
			Name: (0, _jargon2["default"])(this.props.name).pascal.toString(),
			names: (0, _jargon2["default"])(this.props.name).plural.toString(),
			_name: (0, _jargon2["default"])(this.props.name).snake.toString()
		};

		//copy feature steps
		["_modelController.common.steps.js", "_modelController.show.steps.js", "_modelController.create.steps.js", "_modelController.update.steps.js", "_modelController.delete.steps.js", "_modelController.list.steps.js"].forEach(function (templatePath) {
			var newName = templatePath.replace("_model", "" + context.name);
			_this.fs.copyTpl(_this.templatePath("features/steps/" + templatePath), _this.destinationPath("features/steps/" + context.name + "/" + newName), context);
		}, this);

		//copy fixtures
		this.fs.copyTpl(this.templatePath("spec/fixtures/_modelFixtures.json"), this.destinationPath("spec/fixtures/" + context.names + ".json"), context);

		//copy controller
		this.fs.copyTpl(this.templatePath("app/controllers/_modelController.js"), this.destinationPath("app/controllers/" + context.name + "Controller.js"), context);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});