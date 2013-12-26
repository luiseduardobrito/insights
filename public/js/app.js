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

			when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'LoginCtrl'
			}).

			when('/signup', {
				templateUrl: 'partials/signup.html',
				controller: 'SignupCtrl'
			}).

			when('/rules', {
				templateUrl: 'partials/rules.html',
				controller: 'RulesCtrl'
			}).

			otherwise({
				redirectTo: '/'
			});
	}]);