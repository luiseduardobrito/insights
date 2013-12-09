module.exports = {

	"prefix": "/api",
	
	"get": {

		"/hello": {

			controller: "home",
			method: "index",

			filters: ["authenticated"]
		}
	},

	"post": {}
}