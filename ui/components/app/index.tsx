import { Component, h, Host } from "@stencil/core"
import "smoothly"

import "urlpattern-polyfill"

@Component({
	tag: "ia-app",
	// styleUrl: "style.css",
	scoped: true,
})
export class App {
	render() {
		return (
			<Host>
				<ia-album-view identifier="abc123" />
				{<ia-album-create />}
			</Host>
		)
	}
}
