import { Component, ComponentWillLoad, h, Host, Prop, Watch } from "@stencil/core"
import * as http from "cloudly-http"
import { model } from "../../../../model"

@Component({
	tag: "ia-album-view",
	styleUrl: "style.css",
	scoped: true,
})
export class AlbumView implements ComponentWillLoad {
	@Prop() content?: model.Album[]
	@Prop() identifier?: string

	@Watch("identifier")
	async load(identifier?: string) {
		if (identifier) {
			const response = await http.fetch({ url: `http://127.0.0.1:8787/api/album`, header: { authorization: "asdf" } })
			console.log(response)

			if (response.status < 300) {
				this.content = await response.body
				console.log(this.content)
			}
		}
	}
	componentWillLoad(): void | Promise<void> {
		this.load(this.identifier)
	}

	render() {
		return (
			<Host>
				{this.content
					? this.content.map(a => [
							<h3>{a.title}</h3>,
							<content>
								{a.content?.map(image => (
									<div>
										<img src={image.url} />
										<p>{image.description}</p>
									</div>
								))}
							</content>,
					  ])
					: "no content"}
			</Host>
		)
	}
}
