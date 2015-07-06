/* eslint-disable new-cap */
const <%= name %>Fixtures = require("../../../spec/fixtures/<%= name %>s.json");

import Request from "appeal";

export default function <%= Name %>ControllerShowSteps () {
	this.When(/^a valid create <%= name %> request is received$/, function (callback) {
		this.database.mock({
			//TODO ADD MOCKS WITH ATTRIBUTES
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			],
			"select * from `client_access_tokens` where `token` = 'invalid-client-access-token' and `deleted_at` is null limit 1": [
			],
			"select * from `client_access_tokens` where `token` = 'expired-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		Request
			.post
			.url(this.url + "/<%= name %>")
			.data({data: this.<%= name %>})
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", this.clientAccessToken)
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.When(/^an invalid create <%= name %> request is received$/, function (callback) {
		this.database.mock({
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		Request
			.post
			.url(this.url + "/<%= name %>")
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", "valid-client-access-token")
			.data({data2: this.<%= name %>})
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.Then(/^respond with the newly created <%= name %>'s details$/, function thenRespond<%= Name %>Details(callback) {
		this.response.body.should.have.property("data");
		this.response.body.data.should.have.property("type");
		this.response.body.data.should.have.property("id");
		this.response.body.data.should.have.property("attributes");
		this.response.body.data.type.should.equal("<%= Name %>");
		//TODO ADD ATTRIBUTES
		this.response.body.data.attributes.name.should.equal(<%= name %>Fixtures[0].name);
		callback();
	});
}
