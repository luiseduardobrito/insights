module.exports = function(req, res, ok) {

	if(!req.cookies.user_id || !req.cookies.logged_in
		|| req.cookies.user_id == "false") {

		return res.json({

			result: "error",
			message: "Authenticated required."

		}, 403)
	}	

	else {
		ok();
	}
}