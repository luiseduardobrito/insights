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
		},

		"/rule/create": {

			controller: "rule",
			method: "create",

			filters: ["authenticated"]
		},
	},

	"post": {
		
		"/rule/create": {

			controller: "rule",
			method: "create",

			filters: ["authenticated"]
		}
	}
}