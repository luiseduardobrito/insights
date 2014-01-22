var insightsControllers = angular.module('insightsApp.controllers', []);

insightsControllers.controller('LoggedInCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $user, $alert) {

		$scope.postLogin = function(){
			return $user.checkPostLogin()
		}

		$scope.$watch('postLogin()', function(status) {
			if(status === false)
				document.location.replace("/login.html");
		})
	}
]);

insightsControllers.controller('LoginCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $user, $alert) {

		$scope.me = $user.me;

		$scope.$watch('me()', function(me){

			if(me) {
				$scope.user = me;
				document.location.replace("/");
			}
		})

		$scope.auth = function(){

			$user.auth({
			
				email: $scope.email,
				password: $scope.password

			}, function(err, res) {

				if(err) {

					alert("Problema na autenticação");
					console.error(err);
				}
			})
		}
	}
]);

insightsControllers.controller('SignupCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $User, $alert) {
		
	}
]);

insightsControllers.controller('RulesCtrl', 

	['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $user, $alert) {

		$scope.rules = [];
		
		$user.getRules(function(err, rules) {

			if(err) {
				alert("Erro ao carregar as regras");
				console.error(err);
			}

			else
				$scope.rules = rules;
		})
	}
]);

insightsControllers.controller('CreateRuleCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $user, $alert) {

		$scope.steps = ["Resumo Estatístico"];
		jQuery(".tagsinput").tagsinput()
	}
]);