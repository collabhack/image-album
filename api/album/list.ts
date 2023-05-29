import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as model from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function list(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: model.Album[] | gracely.Error
	const authorization = request.header.authorization
	if (!authorization)
		result = gracely.client.unauthorized()
	else if (gracely.Error.is(context.albumStore))
		result = context.albumStore
	else
		result = (await context.albumStore.list()).map(v => v.value).filter((a): a is model.Album => !!a)
	return result
}
router.add("GET", "/api/album", list)
