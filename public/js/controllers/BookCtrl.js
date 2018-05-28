sampleApp.controller('BookController', function($scope, $http, $log, $location)
{

    $scope.tagline = 'All bookings on this page';

    var refresh = function() {
      var cookieInfo = document.cookie;
  		if(cookieInfo == "") {
  			alert('Please Login / Sign-up to access this module');
  			$location.path('/');
  		} else {
        $http.get('/book/getBooking').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.bookList = response;
            console.log($scope.bookList);
            $scope.booking = "";
        });
        $scope.adminCity = true;
  			$scope.adminTheatre = true;
  			$scope.adminAssign = true;
  			$scope.adminMovies = true;
  			$scope.adminShowtime = true;
  			$scope.adminBooking = true;
  		}
    };

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

    refresh();

    $scope.deleteBooking = function(booking) {
        console.log($scope.booking);
        $http.delete('/book/deleteBooking/' + booking._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

});
