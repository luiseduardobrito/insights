var insightsServices = angular.module("insightsApp.services", []);

insightsServices.factory('alertService', ['$http', 

	function($http) {

		var _this = this;
		var _public = {};

		_this.elem = document.getElementById("myModal");
		_this.scope = null;
		_this.callbackFn = null;

		_this.init = function() {

			_this.scope = angular.element(_this.elem).scope();

			_this.scope.alert = {

				title: "",
				msg: "",
				prompt: false,
			}

			_this.scope.handleResult = _this.handleResult;

			return _public;
		};

		_this.handleResult = function(r) {

			var fn = _this.callbackFn || function(){};

			_public.hide(function(){
				fn(r);
			});

			_this.callbackFn = null;
		}

		_public.show = function(t, m, fn) {

			fn = fn || function() {};

			_this.scope.alert = {
				title: t,
				msg: m,
				prompt: false
			}

			_this.callbackFn = fn;

			jQuery(_this.elem).modal("show");
		}

		_public.prompt = function(t, m, fn) {

			fn = fn || function() {};

			_this.scope.alert = {
				title: t,
				msg: m,
				prompt: true
			}

			_this.callbackFn = fn;

			jQuery(_this.elem).modal("show");
		}

		_public.hide = function(fn) {

			fn = fn || function() {};

			_this.scope.alert = {
				title: "",
				msg: "",
				prompt: false
			}

			jQuery(_this.elem).modal("hide");
			fn();
		}

		return _this.init();
	}
])

insightsServices.factory('userService', ['$http',

	function($http) {

		var _this = this;
		var _public = {};

		_this.me = null;
		_this.postLogin = true;

		_this.init = function() {

			$http({
				url: "/api/user/me", 
				method: "GET",
				params: {}
			})

			.success(function(data) {

				if(!data || data.result == "error") {

					_this.postLogin = false;
					return;
				}

				else
					_this.me = data.user;
			})

			.error(function(err) {
				_this.postLogin = false;
			})

			return _public;
		};

		_public.me = function() {
			return _this.me;
		}

		_public.checkPostLogin = function(){
			return _this.postLogin;
		}

		_public.create = function(user, fn) {

			fn = fn || function() {};

			if(!user || !user.email) {
				return fn(new Error("Email inválido!"));
			}

			$http({
				url: "/api/user/create", 
				method: "GET",
				params: {
					email: user.email,
					password: user.password,
					name: user.name
				}
			})

			.success(function(data) {
				if(!data || data.result == "error") {
					return fn(data, null)
				}
				else
					return fn(null, data.user)
			})

			.error(function(data) {
				return fn(data, null)
			});
		}

		_public.auth = function(user, fn) {

			fn = fn || function() {};

			if(!user || !user.email || !user.password) {
				return fn(new Error("Usuário ou senha inválidos!"));
			}

			$http({
				url: "/api/user/login",
				method: "GET",
				params: {
					email: user.email,
					password: user.password
				}
			})

			.success(function(data) {

				if(data && data.user) {
					_this.me = data.user;
					fn(null, _public.me());
				}

				else {

					fn(data, null)
				}

			})

			.error(function(err) {
				fn(err, null);
			});
		}

		_public.getRules = function(fn) {

			$http({

				url: "/api/user/get_rules",
				method: "GET"
			})

			.success(function(data) {
				if(data && data.user) {
					_this.me = data.user;
				}

				fn(null, data.rules);
			})

			.error(function(err) {
				fn(err, null);
			});
		}

		return _this.init();
	}
])

insightsServices.factory('ruleService', ['$http',

	function($http) {
		
		var _this = this;
		var _public = {};

		_this.init = function(){
			return _public;
		}

		_public.create = function(data, fn) {

			$http({

				url: "/api/rule/create",
				method: "GET",
				params: data
			})

			.success(function(data) {
				if(data && data.user) {
					_this.me = data.user;
				}

				fn(null, _public.me());
			})

			.error(function(err) {
				fn(err, null);
			});
		}

		_public.span = function(rule, fn) {

			$http({

				url: "/api/rule/create",
				method: "GET",

				params: {
					id: rule
				}
			})

			.success(function(data) {
				if(data && data.user) {
					_this.me = data.user;
				}

				fn(null, _public.me());
			})

			.error(function(err) {
				fn(err, null);
			});	
		}

		return _this.init();
	}
])