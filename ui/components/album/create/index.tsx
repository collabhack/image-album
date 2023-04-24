import { Component, h, Host, Listen } from "@stencil/core"
import * as http from "cloudly-http"
import { model } from "../../../../model"

@Component({
	tag: "ia-album-create",
	// styleUrl: "style.css",
	scoped: true,
})
export class AlbumCreate {
	@Listen("submit")
	async listen(event: CustomEvent) {
		const album: model.Album = event.detail as model.Album
		const request = http.Request.create({
			url: "http://127.0.0.1:8787/api/album",
			body: album,
			method: "POST",
			header: { authorization: "placeholder" },
		})
		const response = await http.fetch(request)
		const body = await response.body
		console.log("listening", { ...response, body: body })
	}

	render() {
		return (
			<Host>
				<smoothly-form looks="grid" onSmoothlyFormSubmit={e => this.listen(e)}>
					<smoothly-input type="text" name="title">
						Title
					</smoothly-input>
					<smoothly-input type="text" name="description">
						Description
					</smoothly-input>
					<smoothly-input-file>Test</smoothly-input-file>
					<smoothly-submit slot="submit">Submit</smoothly-submit>
				</smoothly-form>
			</Host>
		)
	}
}
