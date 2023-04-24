import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as model from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function list(request: http.Request, _: Context): Promise<http.Response.Like | any> {
	let result: model.Album[] | gracely.Error
	const authorization = request.header.authorization
	if (!authorization)
		result = gracely.client.unauthorized()
	else
		result = [
			{
				title: "Beard",
				id: "foo",
				content: [
					{
						url: "http://placebeard.it/640/480",
						description: "bar",
					},
				],
			},
		]
	return result
}
router.add("GET", "/api/album", list)
