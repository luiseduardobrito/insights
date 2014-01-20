var mongoose = require("../services/mongoose");
var User = mongoose.model("user");
var Rules = mongoose.model("rule");

module.exports = {
	
	create: function(req, res) {

		var requiredFields = ["email", "name", "password"];
		var input = {};

		for(var i = 0; i < requiredFields.length; i++) {

			if(!req.param(requiredFields[i]))
				return res.json({
					result: "error",
					message: "Required field " + requiredFields[i] + " missing"
				})

			else 
				input[requiredFields[i]] = req.param(requiredFields[i]);
		}

		var user = new User(input)

		user.save(function(err) {

			if(err) {
				return res.json({
					result: "error",
					message: "Could not save new user in db",
					exception: err
				})
			}

			return res.json({
				result: "success", 
				message: "User created successfully!",
				user: user
			})
		})
	},

	login: function(req, res) {

		var requiredFields = ["email", "password"];
		var input = {};

		for(var i = 0; i < requiredFields.length; i++) {

			if(!req.param(requiredFields[i]))
				return res.json({
					result: "error",
					message: "Required field '" + requiredFields[i] + "' missing"
				})

			else 
				input[requiredFields[i]] = req.param(requiredFields[i]);
		}

		User.authenticate({

			email: input.email,
			password: input.password

		}, function(err, me) {

			if(err || !me) {
				return res.json({
					result: "error",
					message: "Invalid information"
				})
			}

			else {

				res.cookie("user_id", me._id);
				res.cookie("logged_in", "true");

				return res.json({
					result: "success", 
					message: "User logged in successfully!",
					user: me
				})
			}

		})
	},

	logout: function(req, res) {

		res.cookie("user_id", "");
		res.cookie("logged_in", "false");

		return res.json({
			result: "success", 
			message: "User logged out successfully!"
		})
	},

	getRules: function(req, res) {

		Rules
			.find({	owner: req.cookies.user_id })
			.exec(function(err, docs){

				if(err) {

					return res.json({
						result: "error", 
						message: "Could not find rules",
						exception: err
					})
				}

				return res.json({
					result: "success", 
					message: "Rules found successfully!",
					rules: docs
				})
			})
	}
}