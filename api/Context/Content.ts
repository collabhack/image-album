import * as gracely from "gracely"
import * as storage from "cloudly-storage"
import { model } from "../../model"
import { Environment } from "./Environment"

export class Content {
	private constructor(private readonly store: storage.KeyValueStore) {}

	async set(album: string, image: model.Image): Promise<model.Image> {
		await this.store.set(`${album}|${image.url}`, image)
		return image
	}
	async list(album: string): Promise<model.Image[] | undefined> {
		return (await this.store.list({ prefix: album })).map(v => v.value)
	}
	async get(url: string): Promise<model.Image | undefined> {
		return (await this.store.get(url))?.value
	}

	static open(environment: Environment): Content | gracely.Error {
		const store =
			(environment.store && storage.KeyValueStore.open(environment.store, "arrayBuffer")) ??
			gracely.server.misconfigured("store", "KV environment variable missing.")
		return gracely.Error.is(store) ? store : new Content(store)
	}
}
