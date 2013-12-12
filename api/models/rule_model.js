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
		required: true,
		default: 1 * 1000 // 1 minuto
	},

	next: {

		type: String,
		required: true,

		default: function() {
			return (new Date(Date.now())).toISOString()
		}
	},

	time: {

		type: String,
		required: true,

		default: function() {
			return (new Date(Date.now())).toISOString()
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

RuleSchema.statics.setReady = function (item, fn) {

	return this.findOne({

		_id: item._id

	}, function(err, rule) {

		if(err)
			return fn(err, null);
		else {

			var i = rule.interval || 15 * 10000;
			rule.next = (new Date(Date.now() + i)).toISOString()
			return rule.save(fn)
		}
	});
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