var phonecatApp = angular.module('insightsApp', [
	'ngRoute',
	'insightsControllers'
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