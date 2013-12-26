var mongoose = require("../api/services/mongoose");
var Timespan = mongoose.model("timespan");

var Manager = function() {
	
	var _this = this;
	var _public = _this.exports = {};
	
	_public.addItem = function(data, cb) {
		
		cb = cb || function(){};
			
		if(!data.serie && !data.rule)
			throw new Error("No data serie defined");
		
		else if(!data.value && !data.values)
			throw new Error("No data values defined");
		
		else {
			
			var analysis = new Timespan({
				rule: data.serie || data.rule,
				time: data.time || (new Date()).getTime(),
				values: data.values || data.value
			});
				
			analysis.save(cb);
		}
		
	};
	
	_public.getLatestAnalysis = function(serie, cb) {
		
		Timespan
			.find({	rule: serie })
			.limit(1)
			.sort({
				time: -1
			})
			.exec(cb);
	};
	
	_public.getTimeSpan = function(serie, rest, cb) {
		
		var time_restriction = {}
		time_restriction["$lt"] = rest.max;
		time_restriction["$gt"] = rest.min;
		
		if(!time_restriction["$lt"] || !time_restriction["$lt"])
			throw new Error("Timespan restriction not defined. " + 
				"Don't forget to specify both max and min time values.");
		
		Timespan
			.find({
				rule: serie,
				time: time_restriction
			})
			.limit(1)
			.sort({
				time: -1
			})
			.exec(cb);
	};
	
	_public.getItems = function(serie, rest, cb) {
		
		Timespan
			.find(rest)
			.sort({
				time: -1
			})
			.exec(cb);
	};
	
	_this.init = function() {
		return _public;
	}
	
	return _this.init();
}

module.exports = new Manager();