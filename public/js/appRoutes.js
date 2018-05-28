angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/booking', {
			templateUrl: 'views/booking.html',
			controller: 'BookController'
		})
		.when('/movies', {
			templateUrl: 'views/movies.html',
			controller: 'MoviesController'
		})
		.when('/city', {
			templateUrl: 'views/city.html',
			controller: 'cityController'
		})
		.when('/showtime', {
			templateUrl: 'views/showtime.html',
			controller: 'showtimeController'
		})
		.when('/assign', {
			templateUrl: 'views/assign.html',
			controller: 'AssignController'
		})
    .when('/theatre', {
			templateUrl: 'views/theatre.html',
			controller: 'theatreController'
		});

	$locationProvider.html5Mode(true);

}]);
