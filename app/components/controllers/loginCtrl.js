// LoginCtrl
app.controller('loginCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {

  $scope.login = function() {
    var apiEndpoint = "https://tvtracker.co.za/api/login";
    //var apiEndpoint = "http://dev.tvtracker.co.za/api/login";

    var api = $resource(apiEndpoint, {}, {
      post: {method: 'POST'}
    });

    api.post({
      'username': $scope.username,
      'password': $scope.password
    }, function(data){
      if (!data.data.token) {
        return alert("Authentication failed");
      }
      $location.path('/');
    }, function(data){
      return alert("Something went wrong");
    });
  }

}]);
