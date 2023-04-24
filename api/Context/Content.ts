import * as gracely from "gracely"
import * as storage from "cloudly-storage"
import { model } from "../../model"
import { Environment } from "./Environment"

export class Content {
	private constructor(
		private readonly store: storage.KeyValueStore<Omit<model.Image, "file">>,
		private readonly bucket: R2Bucket
	) {}

	async set(album: string, image: model.Image): Promise<model.Image> {
		await this.store.set(`${album}|${image.url}`, { url: image.url, description: image.description })
		await this.bucket.put(`${album}|${image.url}`, image.file)
		return image
	}
	async list(album: string): Promise<model.Image[] | undefined> {
		const result: model.Image[] = []
		const entries = (await this.store.list({ prefix: album })).map(v => v.value)
		for (const entry of entries) {
			const file = await (await this.bucket.get(`${album}|${entry?.url}`))?.blob()
			file && entry && result.push({ ...entry, file: file })
		}
		return result
	}
	async get(album: string, url: string): Promise<model.Image | undefined> {
		const data = (await this.store.get(`${album}|${url}`))?.value
		const image = await (await this.bucket.get(`${album}|${url}`))?.blob()
		return image && data && { ...data, file: image }
	}

	static open(environment: Environment): Content | gracely.Error {
		let result: Content | gracely.Error
		const bucket = environment.bucket ?? gracely.server.misconfigured("bucket", "Bucket environment variable missing.")
		const store =
			(environment.store && storage.KeyValueStore.Json.create(environment.store)) ??
			gracely.server.misconfigured("store", "KV environment variable missing.")
		if (gracely.Error.is(bucket))
			result = bucket
		else if (gracely.Error.is(store))
			result = store
		else
			result = new Content(store, bucket)
		return result
	}
}
