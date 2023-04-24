import { Component, h, Prop } from "@stencil/core"

@Component({
	tag: "smoothly-input-file",
	styleUrl: "style.css",
	scoped: true,
})
export class SmoothlyInputFile {
	@Prop() name?: string
	@Prop() mode: "folder" | "file" | "files" = "file"
	render() {
		return (
			<input
				name={this.name}
				type="file"
				multiple={this.mode == "files"}
				webkitdirectory={this.mode == "folder"}></input>
		)
	}
}
