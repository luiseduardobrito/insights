var mongoose = require("../services/mongoose");

var Rule = mongoose.model("rule");
var Timespan = mongoose.model("timespan");

module.exports = {
	
	create: function(req, res) {

		if(!req.param("source") || !req.param("tunnel")) {
			return res.json({
				result: "error",
				message: "missing query params"
			})
		}

		var rule = new Rule({
			owner: req.cookies.user_id,
			source: req.param("source"),
			tunnel: req.param("tunnel")
		});

		rule.save(function(err) {

			if(err) {
				return res.json({
					result: "error",
					message: "problem creating rule",
					exception: err
				})

			}

			return res.json({
				result: "success",
				message: "rule created successfully",
				rule: rule
			})
		})
	},

	span: function(req, res) {

		if(!req.param("id")) {
			return res.json({
				result: "error",
				message: "missing query params"
			})
		}

		Timespan.getResume(req.param("id"), function(err, result) {

			return res.json({
				result: "success",
				message: "rule resume found successfully",
				resume: result
			})
		})
	}
}