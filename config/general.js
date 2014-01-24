module.exports = {

	state: "production",
	lang: "en-US",

	development: {

		port: 3000,

		cluster: {

			max: 1
		},

		db: {
	
			protocol: "mongodb://",

			user: "root",
			password: "",

			db: "insights",
			host: "localhost"
		}
	},

	test: {

		port: 3000,

		cluster: {
		
			max: 3
		},

		db: {
	
			protocol: "mongodb://",

			user: "root",
			password: "",

			db: "main",
			host: "localhost"
		}
	},

	production: {

		port: 3000,

		cluster: {
		
			max: 3
		},

		db: {
		
			protocol: "mongodb://",
			port: 10008,

			user: "heroku",
			password: "heroku",

			db: "app21538937",
			host: "troup.mongohq.com"
		}
	}
}