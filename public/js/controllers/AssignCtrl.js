sampleApp.controller('AssignController', function($scope, $http, $log, $location){

	$scope.tagline = 'Now ya can create shows by assigning movies to show times, Its SHOW TIME!';

	var getMovies = function(){
			$http.get('/movie/getMovie').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.moviList = response;
					$scope.movi = "";
					console.log($scope.moviList);
				});
			}

	$scope.logoutUser = function() {
		var cookieInfo = document.cookie;
		console.log(cookieInfo);
		if(cookieInfo == "") {
			alert("Already Logged Out");
		} else {
			document.cookie = cookieInfo + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			//alert("Log Out Successful!");
			$location.path('/');
		}
	}

	var refresh1 = function() {
			$http.get('/city/getCity').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.cityList = response;
					$scope.city = "";
			});
	};

	refresh1();

	var refresh = function() {
		var cookieInfo = document.cookie;
		if(cookieInfo == "") {
			alert('Please Login / Sign-up to access this module');
			$location.path('/');
		} else {
			$http.get('/assign/getAssign').success(function(response) {
					console.log('READ IS SUCCESSFUL');
					$scope.assignList = response;
					$scope.assign = "";
					console.log($scope.assignList);
			});
			$scope.adminCity = true;
			$scope.adminTheatre = true;
			$scope.adminAssign = true;
			$scope.adminMovies = true;
			$scope.adminShowtime = true;
			$scope.adminBooking = true;
		}
	};

	refresh();

	$scope.selectCity = function(assign){
		var cityValue = $scope.assign.cityName;
		console.log(cityValue);
		$http.get('/theatre/getTheatre').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.theatreList = response;
				var returnValue = $scope.theatreList;
				console.log($scope.theatreList);

				var returnValue1 = returnValue.filter(function(o){
				    return (o.cityName === cityValue);
				});
				$scope.returnValue1 = returnValue1;
				console.log(returnValue1);
				//$scope.theatre = "";
		});
	}

	$scope.selectTheatre = function(assign){
		var theatreNameValue = $scope.assign.theatreName;
		console.log(theatreNameValue);
		$http.get('/showTime/getTimings').success(function(response){
			console.log('TIMINGS READ SUCCESSFUL');
			$scope.showtimeList = response;
			var returnTimings = $scope.showtimeList;
			console.log(returnTimings);

			returnTimings = returnTimings.filter(function(o){
					return (o.theatreName === theatreNameValue);
			});
			$scope.returnTimings = returnTimings;
			console.log(returnTimings);
		});
	}

	$scope.selectshowTime = function(assign) {
		$http.get('/movie/getMovie').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.moviList = response;
				$scope.movi = "";
				console.log($scope.moviList);
		});
	}

	var getTheatreDetails = function() {
	        $http.get('/theatre/getTheatre').success(function(response) {
	            console.log('READ IS SUCCESSFUL');
	            $scope.theatreList = response;
	            $scope.theatre = "";
							theatreList = $scope.theatreList;
	        });
	    };

	getTheatreDetails();

	var moviList = function(){
		$http.get('/movie/getMovie').success(function(response) {
				console.log('READ IS SUCCESSFUL');
				$scope.moviList = response;
				$scope.movi = "";
				//console.log($scope.moviList);
				moviList = $scope.moviList;
		});
	}

	moviList();


	$scope.addAssign = function(assign) {

		var userData = $scope.assign.movieTitle;
		var userTheatre = $scope.assign.theatreName;
		console.log(userData);
		console.log(userTheatre);

		theatreList1 = $scope.theatreList;
		$scope.theatreList1 = theatreList1;

		moviList1 = $scope.moviList;
		$scope.movieList1 = moviList1;

		console.log(moviList1);
		console.log(theatreList1);

		$scope.theatreList1 = theatreList1.filter(function(o){
			return (o.theatreName == userTheatre)
		});

		$scope.moviList1 = moviList1.filter(function(o){
			return (o.moviTitle === userData)
		});

		console.log($scope.moviList1);
		console.log($scope.theatreList1);

		moviActors = $scope.moviList1[0].moviActors;
		moviDirector = $scope.moviList1[0].moviDirector;
		moviGenre = $scope.moviList1[0].moviGenre;
		moviLanguage = $scope.moviList1[0].moviLanguage;
		moviPoster = $scope.moviList1[0].moviPoster;

		theatreSeats = $scope.theatreList1[0].theatreSeats;
		ticketPrice = $scope.theatreList1[0].ticketPrice;

		console.log($scope.assign.fromDate);
		console.log(assign.toDate);

		var fromDate1 = moment($scope.assign.fromDate).format('l');
  	var toDate1 = moment($scope.assign.toDate).format('l');

		console.log(fromDate1);

		$scope.fromDate1 = fromDate1;
		$scope.toDate1 = toDate1;

		console.log(fromDate1);


		var assignObj = {
			CName: assign.cityName,
			TName: assign.theatreName,
			STime: assign.showTime,
			MTitle: assign.movieTitle,
			FDate: fromDate1,
			TDate: toDate1,
			MActors: moviActors,
			MDirector: moviDirector,
			MGenre: moviGenre,
			MLanguage: moviLanguage,
			MPoster: moviPoster,
			TSeats: theatreSeats,
			TPrice: ticketPrice
		}
		console.log(assignObj);

		$http({
      method: 'POST',
      url: 'assign/addAssign',
      headers: {'Content-Type': 'application/json'},
      data: angular.fromJson(assignObj)
    })
    .then(function(response){
      console.log(response);
      console.log("TIMINGS ARE ADDED TO THEATRE SELECTED");
      refresh();
    })
	}

	$scope.removeAssign = function(assign) {
			$http.delete('/assign/deleteAssign/' + assign._id).success(function(response) {
					console.log(response);
					console.log('DELETED SUCCESSFULLY');
					refresh();
			});
	};

	$scope.updateAssign = function() {
			console.log("REACHED UPDATE");
			console.log($scope.assign._id);
			$http.put('/assign/updateAssign/' + $scope.assign._id, $scope.assign).success(function(response) {
					console.log(response);
					refresh();
			});
	};

	$scope.editAssign = function(assign) {
			$http.get('/assign/getAssign/' + assign._id).success(function(response) {
					$scope.assign = response[0];
			});
	};


});
