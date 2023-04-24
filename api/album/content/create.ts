import * as gracely from "gracely"
import * as http from "cloudly-http"
import { model } from "../../../model"
import { Context } from "../../Context"
import { router } from "../../router"

export async function create(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const body = await request.body
	const album = request.parameter.album
	const content = context.content

	if (gracely.Error.is(content))
		result = content
	else if (!album || typeof album != "string")
		result = gracely.client.invalidPathArgument(
			"/api/album/:album/content",
			"album",
			"string",
			"Identifier for the content album."
		)
	else if (!request.header.authorization)
		result = gracely.client.unauthorized()
	else if (!model.Image.is(body))
		result = gracely.client.invalidContent("Image", "Body must be an Image to put in the album.")
	else
		result = gracely.success.created(await content.set(album, body))
	return result
}
router.add("POST", "/api/album/:album/content", create)
