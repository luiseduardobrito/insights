var config = require("../config/general");
config = config[config.state];

var log = require("winston");

var Worker = require("./worker");
var Watcher = require("./watcher");

var WorkerManager = function(config){

	var _this = this;
	var _public = _this.exports = {};
	
	var DEFAULT_WATCHERS_NUM = config.watchers || 1;
	var DEFAULT_WORKERS_NUM = config.workers || 1;

	var workers = [];
	var watchers = [];
	
	_this.prepare = function(){
		
		for(var i = 0; i < DEFAULT_WATCHERS_NUM; i++)
			watchers.push(new Watcher());
		
		for(var i = 0; i < DEFAULT_WORKERS_NUM; i++)
			workers.push(new Worker());
	};
	
	_public.startAll = function() {
		
		log.info("worker manager says: starting " + watchers.length + 
				 " watcher"+(watchers.length > 1 ? "s": "")+"...");
		
		for(var i = 0; i < watchers.length; i++)
			watchers[i].start()
			
		log.info("worker manager says: starting " + workers.length + 
				 " worker"+(workers.length > 1 ? "s": "")+"...");
			
		for(var i = 0; i < workers.length; i++)
			workers[i].start()
			
	};
	
	_public.stopAll = function() {
		
		for(var i = 0; i < watchers.length; i++)
			watchers[i].start()
			
		for(var i = 0; i < workers.length; i++)
			workers[i].start()
			
	};
	
	_this.init = function(){
		log.info("worker manager says: starting manager...");
		_this.prepare();
		return _public;
	}
	
	return _this.init();
}

module.exports = new WorkerManager(config);