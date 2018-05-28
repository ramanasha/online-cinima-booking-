sampleApp.controller('LoginController', function($scope, $http, $log, $firebase, $location)
{
    $scope.tagline = 'LOGIN HERE';

    var refresh = function() {
      var cookieInfo = document.cookie;
  		console.log(cookieInfo);
  		if(cookieInfo == "") {
        $scope.signInContainer = true;
        $scope.adminCity = false;
        $scope.adminTheatre = false;
        $scope.adminAssign = false;
        $scope.adminMovies = false;
        $scope.adminShowtime = false;
        $scope.adminBookings = false;
  		} else {
        $location.path('/home'); }
    };
    refresh();

    $scope.signUpUser = function(){

      var auth = firebase.auth();
      firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
        .catch(function (error) {
          alert(error);
        });
    }

    $scope.signInUser = function(){
      var auth = firebase.auth();
      var loginSuccess = true;
      firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function (firebaseUser) {
        document.cookie = "dave";
        var cookieInfo = document.cookie;
        $location.path('/home');
      })
      .catch(function (error) {
        var errorCode = error.code;
        console.log(errorCode);
        var loginSuccess = false;
        var errorMessage = error.message;
        alert(errorMessage);
      })
    }

    $scope.signUpShow = function() {
      $scope.signUpContainer = true;
      $scope.signInContainer = false;
    };

    $scope.goBack = function() {
      $scope.signUpContainer = false;
      $scope.signInContainer = true;
    }

    $scope.signInShow = function() {
      $scope.signUpContainer = false;
      $scope.signInContainer = true;
    };

    $scope.deleteCookieInfo = function() {
      var cookieInfo = document.cookie;
      document.cookie = cookieInfo + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      alert("Cookie Deleted");
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

    $scope.showCookieInfo = function() {
      var cookieInfo = document.cookie;
      if(cookieInfo == "") {
        alert('Cookie is Blank');
      } else { alert(cookieInfo); }
    }

});
