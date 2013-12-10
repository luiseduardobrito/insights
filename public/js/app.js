var phonecatApp = angular.module('insightsApp', [
	'ngRoute',
	'insightsApp.controllers',
	'insightsApp.services'
]);
 
phonecatApp.config(['$routeProvider',
	function($routeProvider) {

		$routeProvider.

			when('/', {
				templateUrl: 'partials/dashboard.html',
				controller: 'DashboardCtrl'
			}).

			otherwise({
				redirectTo: '/'
			});
	}]);