var mongoose = require("../services/mongoose");
var Schema = mongoose.schema;
var validate = require('mongoose-validator').validate;

var TimespanSchema = new Schema({

	rule: {

		type: Schema.Types.ObjectId,
		required: true,
		ref: 'rule'
	},

	values: {

		type: Schema.Types.Mixed,
		required: true
	},

	time: {

		type: String,
		required: true,

		default: function() {
			return (new Date(Date.now())).toISOString()
		}
	}
});

TimespanSchema.methods.toJSON = function() {
	
	obj = this.toObject();

	delete obj.__v;
	obj.id = obj._id;
	delete obj._id;

	return obj;
}

TimespanSchema.statics.getResume = function(rule_id, fn) {

	fn = fn || function(){};

	this
		.find({	rule: rule_id })
		.sort({	time: -1 })
		.limit(10)
		.exec(fn)
}

module.exports = TimespanSchema;