var log = require("winston");

var bundleInterpreter = require("./bundles/interpreter");

var PipelineInterpreter = require("./pipelines/interpreter");
var pipelineInterpreter = new PipelineInterpreter();

var storage = require("./storage");

var Worker = function(q, t) {

	var _this = this;
	var _public = _this.exports = {};

	// autostart
	var START_ON_INIT = false;
	var DEFAULT_TIMEOUT = 5000;

	var active = false;
	var queue = q || require("./queue") || null;
	var storage = require("./storage");

	var refreshIntervalId = null; 
	var timeout = t || DEFAULT_TIMEOUT;

	_public.start = function(timeout) {
		
		active = true;
		timeout = timeout || DEFAULT_TIMEOUT;

		_public.work();

		setInterval(function(){

			if(!active && refreshIntervalId) {
				clearInterval(refreshIntervalId);
				return;
			}

			_public.work();
			
		}, timeout);

	};

	_public.work = function() {

		queue.get(function(task){
			
			log.info("worker says: new task found! (rule: '"+task._id+"')");
			
			var _t = task;
			
			try {
			
				bundleInterpreter.get(task.source, function(items) {
					_this.analysis(items, _t);
				});
			}
			
			catch(e) {
				log.info("worker says: problem running bundle interpreter. ", e.message);
			}
		});

	};
	
	_this.analysis = function(items, task) {
		
		pipelineInterpreter.input(task.tunnel, {result: items});

		pipelineInterpreter.result(function(result){
			
			log.info("worker says: task done successfully! (rule: '"+task._id+"')");
			
			storage.addItem({
				rule: task._id,
				values: result
			});
		});
	};

	_public.isActive = function(){

		return active ? true : false;

	};

	_public.stop = function() {
		
		active = false;

	};

	_this.init = function() {

		if(START_ON_INIT)
			start();
		
		return _public;
	};

	return _this.init();
};

module.exports = Worker;