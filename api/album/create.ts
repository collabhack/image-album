import * as gracely from "gracely"
import * as storage from "cloudly-storage"
import * as http from "cloudly-http"
import * as model from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function create(request: http.Request, _: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const album = await request.body
	if (!request.header.authorization)
		result = gracely.client.unauthorized()
	else if (!model.Album.is(album))
		result = gracely.client.invalidContent("Item", "Body is not a valid item.")
	else
	

	result = gracely.success.created(album)
	return result
}
router.add("POST", "/api/album", create)
