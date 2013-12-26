var queue = function(){

	var _this = this;
	var _public = _this.exports = {};

	var q = [];

	_public.push = function(data) {

		q.push(data);

	};

	_public.get = function(cb) {

		cb = cb || function(){};

		var task = q.shift() || false;

		if(task)
			cb(task);

	};

	_public.size = function() {

		return q.length;

	};

	_this.init = function() {

		if(queue.caller != queue.getInstance){
			throw new Error("This object cannot be instanciated");
		}

		return _public;
	}

	return _this.init();
}
 
/* ************************************************************************
SINGLETON CLASS DEFINITION
************************************************************************ */
queue.instance = null;

/**
 * singleton getInstance definition
 * @return queue class
 */
queue.getInstance = function(){
	if(this.instance === null){
		this.instance = new queue();
	}
	return this.instance;
}

module.exports = queue.getInstance();