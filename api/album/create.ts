import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as model from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function create(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const album = await request.body
	const store = context.albumStore
	if (!request.header.authorization)
		result = gracely.client.unauthorized()
	else if (!model.Album.is(album))
		result = gracely.client.invalidContent("Album", "Body is not a valid album.")
	else if (gracely.Error.is(store))
		result = store
	else {
		store.set(album.id, album)
		result = gracely.success.created(album)
	}


	return result
}
router.add("POST", "/api/album", create)
