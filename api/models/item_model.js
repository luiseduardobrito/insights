var mongoose = require("../services/mongoose");
var Schema = mongoose.schema;
var validate = require('mongoose-validator').validate;

var ItemSchema = new Schema({

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

ItemSchema.methods.toJSON = function() {
	
	obj = this.toObject();

	delete obj.__v;
	obj.id = obj._id;
	delete obj._id;

	return obj;
}

module.exports = ItemSchema;