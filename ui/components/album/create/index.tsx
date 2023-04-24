import { Component, h, Host } from "@stencil/core"

@Component({
	tag: "ia-album-create",
	// styleUrl: "style.css",
	scoped: true,
})
export class AlbumCreate {
	render() {
		return (
			<Host>
				<smoothly-form looks="grid">
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
