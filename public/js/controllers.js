var insightsControllers = angular.module('insightsApp.controllers', []);

insightsControllers.controller('DashboardCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $User, $alert) {

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

insightsControllers.controller('RulesCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $User, $alert) {
		
	}
]);

insightsControllers.controller('CreateRuleCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $User, $alert) {

		$scope.steps = [
			{ "value": 1 , "text": "Amsterdam", "continent": "Europe"},
			{ "value": 4 , "text": "Washington", "continent": "America"},
			{ "value": 7 , "text": "Sydney", "continent": "Australia"},
			{ "value": 10, "text": "Beijing", "continent": "Asia"},
			{ "value": 13, "text": "Cairo", "continent": "Africa"}
		];
	}
]);