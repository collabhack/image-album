import { Context } from "./Context"
import { Environment } from "./Context/Environment"

import "./version"
import "./item"
import "./album"

export default {
	async fetch(request: Request, environment: Environment) {
		return await Context.handle(request, environment)
	},
}
