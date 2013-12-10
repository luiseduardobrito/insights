var mongoose = require("../services/mongoose");
var Schema = mongoose.schema;
var validate = require('mongoose-validator').validate;

var UserSchema = new Schema({

	name: {

		type: String,
		required: true
	},

	email: {

		type: String,
		required: true,

		index: {
			unique: true, 
			dropDups: false
		}
	},

	password: {

		type: String,
		required: true
	},

	cel: {
		type: String
	}
});

// ---------- Password Encryption ---------- //
UserSchema.pre('save', function(next) {

	var bcrypt = require("bcrypt");
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) 
		return next();

	// generate a salt
	bcrypt.genSalt(10, function(err, salt) {

		if (err) 
			return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {

			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.toJSON = function() {
	
	obj = this.toObject();

	delete obj.__v;
	delete obj.password;

	obj.id = obj._id;
	delete obj._id;

	return obj;
}

UserSchema.statics.authenticate = function (user, cb) {

	this.findOne({ 

		email: user.email

	}, function(err, candidate) {

		if(err) {

			cb(err, null);
			return;
		}

		else if(!candidate) {
			cb(new Error("User not found"), null)	
			return;
		}

		var bcrypt = require("bcrypt");
		bcrypt.compare(user.password, candidate.password, function(err, isMatch) {

			if (err) 
				return cb(err, null);

			else if(!isMatch)
				return cb(null, false);

			else
				cb(null, candidate);
		});
	});

};

module.exports = UserSchema;