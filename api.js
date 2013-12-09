/**
 * 		>>> Application Router <<<
 *	
 *	  Handle all incoming connections
 * 
 * 			Edit carefully!
 */

var map = require("./config/routes");
var async = require("async");

var AppRouter = function(map) {

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var _this = this;
	var _public = _this.exports = {};

	_this.map = map;

	_this.init = function(){
		return _public;
	};

	_this.checkFilter = function(middleware, filter, fn) {

		fn = fn || function(){};

		var _req = middleware.req;
		var _res = middleware.res;

		filter = require("./api/filters/" + filter.toString());

		filter(_req, _res, function(){
			fn(null, true);
		})
	}

	_this.applyFilters = function(middleware, filters, fn) {

		var _req = middleware.req;
		var _res = middleware.res;

		if(toString.call(filters) !== toString.call([])) {

			if(filters.length)
				filters = [filters]

			else
				filters = []
		}
		
		var filterSerie = [];

		for(var i = 0; i < filters.length; i++) {

			filterSerie.push(
				async.apply(_this.checkFilter, {
					req: _req,
					res: _res
				}, filters[i])
			)
		}

		async.series(filterSerie, function(err, result) {
			fn(_req, _res);
		})
	};

	_this.routeGateway = function(filters, fn) {

		return function(request, response) {

			_this.applyFilters({
				req: request,
				res: response
			}, filters, fn)
		}
	}

	_public.router = function(app) {

		for(var k in map.get || {}) {

			var ctrl = map.get[k].controller;
			var action = map.get[k].method || "index";

			ctrl = require("./api/controllers/" + ctrl);

			if(!ctrl[action]) {
				throw new Error("Controller not defined", [ctrl, action]);
			}

			var uri = (map.prefix || "") + k;
			var filters = map.get[k].filters || [];

			app.get(uri, _this.routeGateway(filters, ctrl[action]));
		}

		for(var k in map.post || {}) {

			var ctrl = map.post[k].controller;
			var action = map.post[k].method || "index";

			ctrl = require("./api/controllers/" + ctrl);

			if(!ctrl[action]) {
				throw new Error("Controller not defined", [ctrl, action]);
			}

			var uri = (map.prefix || "") + k;
			app.post(uri, ctrl[action]);
		}

		for(var k in map.put || {}) {

			var ctrl = map.put[k].controller;
			var action = map.put[k].method || "index";

			ctrl = require("./api/controllers/" + ctrl);

			if(!ctrl[action]) {
				throw new Error("Controller not defined", [ctrl, action]);
			}

			var uri = (map.prefix || "") + k;
			app.put(uri, ctrl[action]);
		}
	};

	return _this.init();
};

module.exports = new AppRouter(map);