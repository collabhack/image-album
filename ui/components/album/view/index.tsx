import { Component, h, Host, Prop } from "@stencil/core"
import { model } from "../../../../model"

@Component({
	tag: "ia-album-view",
	styleUrl: "style.css",
	scoped: true,
})
export class AlbumView {
	@Prop() content?: model.Album

	render() {
		return (
			<Host>
				{this.content
					? [
							<h3>{this.content.title}</h3>,
							<content>
								{this.content.content.map(image => (
									<div>
										<img src={image.url} />
										<p>{image.description}</p>
									</div>
								))}
							</content>,
					  ]
					: "no content"}
			</Host>
		)
	}
}
