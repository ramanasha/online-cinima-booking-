sampleApp.controller('cityController', function($scope, $http, $log, $location)
{
    $scope.tagline = 'Add your city here';

    var refresh = function() {
      var cookieInfo = document.cookie;
      if(cookieInfo == "") {
        alert('Please Login / Sign-up to access this module');
        $location.path('/');
      } else {
        $http.get('/city/getCity').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
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

    $scope.addCity = function(city)
    {
      var cityObj = {};
      cityObj["cities"] = city.cityName
      $http({
              method: 'POST',
              url: '/city/addCity',
               headers: {'Content-Type': 'application/json'},
              data: cityObj
          })
          .then(function(response) {
              console.log(response);
              console.log("CREATE IS SUCCESSFUL");

              refresh();
          });
      };


    $scope.removeCity = function(city) {
        //console.log(id);
        $http.delete('/city/deleteCity/' + city._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editCity = function(city) {
        $http.get('/city/getCity/' + city._id).success(function(response) {
            $scope.city = response[0];
        });
    };

    $scope.updateCity = function() {
        console.log("REACHED UPDATE");
        console.log($scope.city._id);
        $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function(response) {
            console.log(response);
            refresh();
        });
    };

}
);
