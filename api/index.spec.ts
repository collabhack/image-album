import * as http from "cloudly-http"
describe("/", () => {
	it("temporary", () => {
		const response = http.Response.create("hello world")
		expect(http.Response.is(response)).toEqual(true)
	})
})
