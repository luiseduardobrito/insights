var mongoose = require("../services/mongoose");
var validate = require('mongoose-validator').validate;
var Schema = mongoose.schema;
var async = require("async");

var DEFAULT_INTERVAL = 15*60*1000; // 15 minutos

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
		default: DEFAULT_INTERVAL
	},

	next: {

		type: Date,
		required: true,

		default: function() {
			return (new Date(Date.now())).toISOString()
		}
	},

	time: {

		type: Date,
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
			"$lte": new Date(now)
		}

	}, function(err, rules) {

		if(err) return fn(err, null);

		else {

			var Rules = mongoose.model("rule");
			var next = (new Date(Date.now() + DEFAULT_INTERVAL)).toISOString();

			Rules.update({

				"next": {
					"$lt": now
				}

			}, {

				"$set": {
					"next": next
				}

			}, {multi: true}, function(err) {

				if(err)	
					fn(err, null);

				for(var i = 0; i < rules.length; i++) {
					rules[i] = rules[i].toObject();
				}
				
				fn(null, rules);
			})
		}
	});
};

module.exports = RuleSchema;