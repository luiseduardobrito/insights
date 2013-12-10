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

		_this.init = function() {

		};

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

		return _this.init();
	}
])