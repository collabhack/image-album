import * as cryptly from "cryptly"
import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as model from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function create(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const body = await request.body
	const store = context.albumStore

	if (!request.header.authorization)
		result = gracely.client.unauthorized()
	else if (!model.Album.Creatable.is(body))
		result = gracely.client.invalidContent("Album", "Body must be a valid album.")
	else if (gracely.Error.is(store))
		result = store
	else {
		const album = { ...body, id: cryptly.Identifier.generate(8), content: [] }
		await store.set(album.id, album)
		result = gracely.success.created(album)
	}

	return result
}
router.add("POST", "/api/album", create)
