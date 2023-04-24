import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as model from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function fetch(request: http.Request, _: Context): Promise<http.Response.Like | any> {
	let result: model.Album | gracely.Error
	const id = request.parameter.id
	const store = _.albumStore;
	if (!request.header.authorization)
		result = gracely.client.unauthorized()
	else if (!id || id.length <= 0 || typeof id != "string")
		result = gracely.client.invalidPathArgument("Album/:id", "id", "string", "A valid identifier is required.")
	else if (gracely.Error.is(store))
		result = store
	else
		result = (await store.get(id))?.value ?? gracely.client.notFound(`album not found for ${id}`);
	return result
}
router.add("GET", "/api/album/:id", fetch)
