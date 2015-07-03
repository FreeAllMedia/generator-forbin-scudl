var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

import inflect from "jargon";

module.exports = yeoman.generators.Base.extend({
	initializing: function yoInitializing() {
		this.pkg = require("../../package.json");
	},

	prompting: function yoPrompt() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the stylish " + chalk.red("FamScudl") + " generator! our base path is " + this.destinationRoot()
		));

		var prompts = [{
			type: "input",
			name: "name",
			message: "What is the model name? (use camel case please)",
			default: "myModel"
		}];

		this.prompt(prompts, function (props) {
			this.props = props;

			done();
		}.bind(this));
	},

	writing: function yoWriting() {
		const context = {
			name: this.props.name,
			Name: inflect(this.props.name).pascal.toString(),
			names: inflect(this.props.name).plural.toString(),
			_name: inflect(this.props.name).snake.toString()
		};

		//copy feature steps
		["_modelController.common.steps.js",
		"_modelController.show.steps.js",
		"_modelController.create.steps.js",
		"_modelController.update.steps.js",
		"_modelController.delete.steps.js",
		"_modelController.list.steps.js"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`);
			this.fs.copyTpl(
				this.templatePath("features/steps/" + templatePath),
				this.destinationPath(`features/steps/${context.name}/${newName}`),
				context
			);
		}, this);

		//copy features
		["_modelController.show.feature",
		"_modelController.create.feature",
		"_modelController.update.feature",
		"_modelController.delete.feature",
		"_modelController.list.feature"]
		.forEach((templatePath) => {
			let newName = templatePath.replace("_model", `${context.name}`);
			this.fs.copyTpl(
				this.templatePath("features/" + templatePath),
				this.destinationPath(`features/${context.name}/${newName}`),
				context
			);
		}, this);

		//copy fixtures
		this.fs.copyTpl(
			this.templatePath("spec/fixtures/_modelFixtures.json"),
			this.destinationPath(`spec/fixtures/${context.names}.json`),
			context
		);

		//copy controller
		this.fs.copyTpl(
			this.templatePath("app/controllers/_modelController.js"),
			this.destinationPath(`app/controllers/${context.name}Controller.js`),
			context
		);
	},

	install: function yoInstall() {
		this.installDependencies({
			skipInstall: true
		});
	}
});
