import * as gracely from "gracely"
import { FormData } from "cloudly-formdata"
import * as http from "cloudly-http"
import { router } from "../router"
import { Environment } from "./Environment"

export class Context {
	constructor(public readonly environment: Environment, private readonly request: http.Request) {}
	async authenticate(request: http.Request): Promise<"admin" | undefined> {
		return this.environment.adminSecret && request.header.authorization == `Basic ${this.environment.adminSecret}`
			? "admin"
			: undefined
	}
	static async handle(request: Request, environment: Environment): Promise<Response> {
		let result: Response
		try {
			const context = new Context(environment, http.Request.from(request))
			if (context.request.url.pathname.startsWith("/api"))
				result = await http.Response.to(await router.handle(context.request, context))
			else if (environment.ASSETS)
				result = await environment.ASSETS.fetch(request)
			else if (environment.ui) {
				context.request.url.host = environment.ui
				result = await http.Response.to(await http.fetch(context.request))
			} else
				result = await http.Response.to(
					http.Response.create(
						gracely.server.misconfigured("ASSETS | ui", "Deploy properly with pages or supply ui url.")
					)
				)
		} catch (e) {
			const details = (typeof e == "object" && e && e.toString()) || undefined
			result = await http.Response.to(http.Response.create(gracely.server.unknown(details, "exception")))
		}
		return result
	}
}

http.Parser.add(
	async request =>
		Object.fromEntries(
			(
				await FormData.parse(
					new Uint8Array(await request.arrayBuffer()),
					request.headers.get("Content-Type") ?? "multipart/form-data"
				)
			).entries()
		),
	"multipart/form-data"
)
