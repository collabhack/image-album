import { Component, h } from "@stencil/core"
import "smoothly"

import "urlpattern-polyfill"

@Component({
	tag: "ia-app",
	styleUrl: "style.css",
	scoped: true,
})
export class App {
	render() {
		return (
			<smoothly-app color="dark" title="Image Album">
				<smoothly-app-room label="View" path="/">
					<ia-album-view
						identifier="abc123"
						// content={{
						// 	id: "abc123",
						// 	title: "Titlish",
						// 	content: [
						// 		{
						// 			url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
						// 			description: "This is an image.",
						// 			file: new Blob(),
						// 		},
						// 		{
						// 			url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
						// 			description: "This is an image.",
						// 			file: new Blob(),
						// 		},
						// 		{
						// 			url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
						// 			description: "This is an image.",
						// 			file: new Blob(),
						// 		},
						// 		{
						// 			url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
						// 			description: "This is an image.",
						// 			file: new Blob(),
						// 		},
						// 	],
						// }}
					/>
				</smoothly-app-room>
				<smoothly-app-room label="Create" path="/create">
					<ia-album-create />
				</smoothly-app-room>
			</smoothly-app>
		)
	}
}
