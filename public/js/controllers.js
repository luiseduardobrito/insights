var insightsControllers = angular.module('insightsApp.controllers', []);

insightsControllers.controller('DashboardCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $user, $alert) {

		// $alert.show("Testando", "Erro teste");
		
	}
]);

// insightsControllers.controller('LoginCtrl', ['$scope', '$http', 'userService', 'alertService',

// 	function ($scope, $http, $User, $alert) {
		
// 	}
// ]);

// insightsControllers.controller('SignupCtrl', ['$scope', '$http', 'userService', 'alertService',

// 	function ($scope, $http, $User, $alert) {
		
// 	}
// ]);

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