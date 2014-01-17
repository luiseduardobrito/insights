var phonecatApp = angular.module('insightsApp', [
	'ngRoute',
	'insightsApp.directives',
	'insightsApp.controllers',
	'insightsApp.services'
]);
 
phonecatApp.config(['$routeProvider', '$locationProvider',
	
	function($routeProvider, $locationProvider) {

		$locationProvider
			.html5Mode(false)
			.hashPrefix('!');

		$routeProvider

			.when('/', {
				redirectTo: '/rules'
			})

			//when('/', {
			//	templateUrl: 'partials/dashboard.html',
			//	controller: 'DashboardCtrl'
			//}).

			// when('/login', {
			// 	templateUrl: 'partials/login.html',
			// 	controller: 'LoginCtrl'
			// }).

			// when('/signup', {
			// 	templateUrl: 'partials/signup.html',
			// 	controller: 'SignupCtrl'
			// }).

			.when('/rules', {
				templateUrl: 'partials/rules.html',
				controller: 'RulesCtrl'
			})

			.when('/rule/create', {
				templateUrl: 'partials/create-rule.html',
				controller: 'CreateRuleCtrl'
			})

			.otherwise({
				redirectTo: '/'
			});
	}]);