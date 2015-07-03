import ApplicationController from "./applicationController.js";
import <%= Name %> from "../models/<%= name %>.js";
import MultiError from "blunder";
import {isAssigned, isNumber} from "proven";
import {BadRequestError} from "../errors.js";

export default class <%= Name %>Controller extends ApplicationController {

	show(request, response) {
		if(!(isNumber.call(request.params, "id").result)) {
			response.badRequest(new BadRequestError());
		} else {
			let <%= name %> = new <%= Name %>({id: request.params.id});
			<%= name %>.fetch((fetchError) => {
				if(fetchError) {
					response.notFound(fetchError);
				} else {
					response.ok(<%= name %>.toJSON());
				}
			});
		}
	}

	create(request, response) {
		if(!(isAssigned.call(request.body, "data").result)) {
			response.badRequest(new BadRequestError());
		} else {
			let new<%= Name %> = new <%= Name %>({
				contentPackageId: request.body.data.contentPackageId,
				name: request.body.data.name,
				type: request.body.data.type,
				creatorName: request.body.data.creatorName,
				collectionName: request.body.data.collectionName,
				categoryName: request.body.data.categoryName,
				mimeType: request.body.data.mimeType,
				priceInCredits: request.body.data.priceInCredits,
				description: request.body.data.description,
				copyright: request.body.data.copyright
			});

			new<%= Name %>.save((saveError) => {
				if(saveError) {
					response.conflict(saveError);
				} else {
					response.created(new<%= Name %>.toJSON());
				}
			});
		}
	}

	update(request, response) {
		if(!(isNumber.call(request.params, "id").result)) {
			response.badRequest(new BadRequestError());
		} else if(!(isAssigned.call(request.body, "data").result)) {
			response.badRequest(new BadRequestError());
		} else {
			let <%= name %> = new <%= Name %>();
			<%= name %>.id = request.params.id;
			<%= name %>
			.fetch((fetchError) => {
				if(fetchError) {
					response.notFound(fetchError);
				} else {
					<%= name %>.contentPackageId = request.body.data.contentPackageId;
					<%= name %>.name = request.body.data.name;
					<%= name %>.type = request.body.data.type;
					<%= name %>.creatorName = request.body.data.creatorName;
					<%= name %>.collectionName = request.body.data.collectionName;
					<%= name %>.categoryName = request.body.data.categoryName;
					<%= name %>.mimeType = request.body.data.mimeType;
					<%= name %>.priceInCredits = request.body.data.priceInCredits;
					<%= name %>.description = request.body.data.description;
					<%= name %>.copyright = request.body.data.copyright;

					<%= name %>.save((saveError) => {
						if(saveError) {
							response.conflict(saveError);
						} else {
							response.ok(<%= name %>.toJSON());
						}
					});
				}
			});
		}
	}

	delete(request, response) {
		if(!(isNumber.call(request.params, "id").result)) {
			response.badRequest(new BadRequestError());
		} else {
			let <%= name %> = new <%= Name %>({id: request.params.id});
			<%= name %>.fetch((fetchError) => {
				if(fetchError) {
					response.notFound(fetchError);
				} else {
					<%= name %>.delete((deleteError) => {
						if(deleteError) {
							response.internalServerError(deleteError);
						} else {
							response.noContent();
						}
					});
				}
			});
		}
	}

	list(request, response) {
		<%= Name %>
			.find
			.all
			.results((errors, <%= Name %>s) => {
				if(errors) {
					let multiError = new MultiError(errors);
					response.conflict(multiError);
				} else {
					let result = <%= Name %>s.map((value) => {
						return value.toJSON();
					});
					response.ok(result);
				}
			});
	}
}
