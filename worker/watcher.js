var log = require("winston");
var mongoose = require("../api/services/mongoose");

var Rule = mongoose.model("rule");

var Watcher = function(q, t){

	// autostart
	var START_ON_INIT = false;
	var DEFAULT_TIMEOUT = 100000;

	var exports = {};
	var active = false;
	var queue = q || require("./queue") || null;
	var storage = require("./storage");

	var refreshIntervalId = null; 
	var timeout = t || DEFAULT_TIMEOUT;

	var start = function(timeout) {
	
		active = true;
		timeout = timeout || DEFAULT_TIMEOUT;

		work();

		setInterval(function(){

			if(!active && refreshIntervalId) {
				clearInterval(refreshIntervalId);
				return;
			}

			work();
			
		}, timeout);

	}; exports.start = start;

	var work = function() {
		
		Rule.getQueue(function(err, items){
			
			if(err) {
				return console.log("Error in watcher!", err);
			}

			else if(!items || !items.length) {
				return;
			}
			
			else {
				
				if(toString.call(items) !== toString.call([]))
					items = [items];
				
				for(var i = 0; i < items.length; i++) {
					updateItem(items[i]);
				}				
			}
		});

	}; exports.work = work;
	
	var updateItem = function(item) {
		
		log.info("watcher says: new expired rule found! (id: '"+item._id+"')");
		
		var rpt = item.repeat || 15;
		item.next = (new Date((new Date()).getTime() + rpt * 60000)).getTime()

		Rule.setReady(item, function() {
			queue.push(item);
		})
	};

	var isActive = function(){

		return active ? true : false;

	}; exports.isActive = isActive;

	var stop = function() {
		
		active = false;

	}; exports.stop = stop;

	var init = function() {

		if(START_ON_INIT)
			start();
		
		return exports;
	};

	return init();
};

module.exports = Watcher;