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

	['$scope', '$http', 'userService', 'alertService', '$location',

	function ($scope, $http, $user, $alert, $location) {

		$scope.rules = [];

		$scope.goto = function(p) {
			$location.path(p)
		}
		
		$user.getRules(function(err, rules) {

			if(err) {
				alert("Erro ao carregar as regras");
				console.error(err);
			}

			else
				$scope.rules = rules;
		})

		$scope.details = function(rule_id) {
			$location.path("rule/" + rule_id)
		}
	}
]);

insightsControllers.controller('RuleDetailsCtrl', 

	['$scope', '$routeParams', 'userService', 'ruleService', '$location',

	function ($scope, $routeParams, $user, $rule, $location) {

		$scope.$watch('span', function(span) {

			$scope.data = {
				headers: [],
				rows: []
			};

			if(span && span.resume && span.resume.length) {

				var resume = span.resume;
				var headerSize = parseInt(100 / (Object.keys(resume[0].values).length + 1));

				// prepare headers
				for(var k in resume[0].values) {
					$scope.data.headers.push({
						label: k,
						size: headerSize + '%'
					})
				}

				$scope.data.headers.push({
					label: "Timestamp",
					size: headerSize + '%'
				})

				// prepare rows
				for(var i = 0; i < resume.length; i++) {

					var row = [];

					for(var k in resume[i].values) {
						row.push(resume[i].values[k])
					}

					row.push(new Date(parseInt(resume[i].time)).toLocaleString());

					$scope.data.rows.push(row);
				}
			}
		})

		$rule.span($routeParams.id, function(err, span) {

			if(err || !span) {
				alert("Problemas ao carregar regra!");
				$location.path("rules");
			}

			else {

				$scope.span = span;
			}
		})

		$rule.get($routeParams.id, function(err, rule) {

			if(err || !rule) {

				alert("Problemas ao carregar regra!");
				$location.path("rules");
			}

			else {
				$scope.rule = rule;
			}
		})
	}
]);

insightsControllers.controller('CreateRuleCtrl', ['$scope', '$http', 'userService', 'ruleService', '$location',

	function ($scope, $http, $user, $rule, $location) {

		$scope.steps = ["Resumo Estatístico"];
		jQuery(".tagsinput").tagsinput()

		$scope.pipelines = {

			statistic: {
				pipeline: "statistic",
				method: "resume"
			},

			content: {
				pipeline: "content",
				method: "tags"
			},

			sentiment: {
				pipeline: "content",
				method: "sentiment"
			}
		}

		$scope.create = function() {

			$rule.create({

				source: {
					bundle: $scope.bundle,
					q: $scope.query
				},

				tunnel: {
					time: $scope.time,
					steps: [{
						pipeline: $scope.pipelines[$scope.analysis].pipeline,
						method: $scope.pipelines[$scope.analysis].method
					}]
				}

			}, function(err, result) {

				if(err) {
					alert("Não foi possível criar a regra");
					return;
				}

				else {
					$location.path("rules");
				}
			})
		}
	}
]);