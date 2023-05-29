import { Image } from "../Image"
import { Creatable as AlbumCreatable } from "./Creatable"

export interface Album extends Album.Creatable {
	id: string
	content: Image[]
}

export namespace Album {
	export type Creatable = AlbumCreatable
	export const Creatable = AlbumCreatable

	export function is(value: any | Album): value is Album {
		return typeof value == "object" && typeof value.id == "string" && typeof value.title == "string"
	}
}
