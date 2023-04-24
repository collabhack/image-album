export interface Image {
	file: Blob
	url: string
	description: string
}

export namespace Image {
	export function is(value: Image | any): value is Image {
		return (
			value &&
			typeof value == "object" &&
			typeof value.url == "string" &&
			typeof value.description == "string" &&
			value.file instanceof Blob
		)
	}
}
