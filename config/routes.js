module.exports = {

	"prefix": "/api",
	
	"get": {

		"/user/create": {

			controller: "user",
			method: "create",
		},

		"/user/login": {

			controller: "user",
			method: "login",
		},

		"/user/logout": {

			controller: "user",
			method: "logout",

			filters: ["authenticated"]
		}
	},

	"post": {}
}