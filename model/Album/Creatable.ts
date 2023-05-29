export interface Creatable {
	title: string
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return value && typeof value == "object" && typeof value.title == "string"
	}
}
