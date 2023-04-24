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
				<ia-album-view
					content={{
						id: "abc123",
						title: "Titlish",
						content: [
							{
								url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
								description: "This is an image.",
							},
							{
								url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
								description: "This is an image.",
							},
							{
								url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
								description: "This is an image.",
							},
							{
								url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
								description: "This is an image.",
							},
						],
					}}
				/>
				{/* <ia-album-create /> */}
			</Host>
		)
	}
}
