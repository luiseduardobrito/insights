var mongoose = require("../services/mongoose");
var Schema = mongoose.schema;
var validate = require('mongoose-validator').validate;

var RuleSchema = new Schema({

	owner: {

		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	},

	source: {

		type: Schema.Types.Mixed,
		required: true
	},

	tunnel: {

		type: Schema.Types.Mixed,
		required: true
	},

	interval: {

		type: Number,
		required: true
	},

	next: {

		type: String,
		required: true,

		default: function() {
			Date.now().toISOString()
		}
	},

	time: {

		type: String,
		required: true,

		default: function() {
			Date.now().toISOString()
		}
	}
});


RuleSchema.methods.toJSON = function() {
	
	obj = this.toObject();

	delete obj.__v;
	obj.id = obj._id;
	delete obj._id;

	return obj;
}

RuleSchema.statics.getQueue = function (fn) {

	var now = new Date(Date.now()).toISOString();

	this.find({ 

		"next": {
			"$lt": now
		}

	}, fn);
};

module.exports = RuleSchema;