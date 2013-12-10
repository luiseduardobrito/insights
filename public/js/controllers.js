var insightsControllers = angular.module('insightsApp.controllers', []);

insightsControllers.controller('DashboardCtrl', ['$scope', '$http', 'userService', 'alertService',

	function ($scope, $http, $User, $alert) {

		$alert.show("Testando", "Erro teste");
		
	}
]);