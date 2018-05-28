sampleApp.controller('MoviesController', function($scope, $http, $log, $location) {

    $scope.tagline = 'Book your movies here!';

    $scope.booking = 'booking';

    var refresh = function() {
      var cookieInfo = document.cookie;
      if(cookieInfo == "") {
        alert('Please Login / Sign-up to access this module');
        $location.path('/');
      } else {
        $http.get('/movie/getMovie').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.moviList = response;
            $scope.movi = "";
            console.log($scope.moviList);
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

    $scope.addMovie = function(movi) {
        $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function(response) {
            //console.log(response);
            var movieObj = {};
            for (var key in response) {
                if (key == 'Title' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors') {
                    movieObj[key] = response[key];
                }
            }
           // $http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/movie/addMovie',
                     headers: {'Content-Type': 'application/json'},
                    data: movieObj
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");

                    refresh();
                });


            // var serviceName = 'movi'
            // $http.post('/movie/addMovie', movieObj).success(function(response) {
            //     console.log(response);
            //     console.log("CREATE IS SUCCESSFUL");
            //     refresh();
            // });

        });
        console.log($scope.contact);

    };

    $scope.removeMovie = function(movie) {
        //console.log(id);
        $http.delete('/movie/deleteMovie/' + movie._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editMovie = function(movie) {
        $http.get('/movie/getMovie/' + movie._id).success(function(response) {
            $scope.movi = response[0];
        });
    };

    $scope.updateMovie = function() {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updateMovie/' + $scope.movi._id, $scope.movi).success(function(response) {
            console.log(response);
            refresh();
        })
    }

});
