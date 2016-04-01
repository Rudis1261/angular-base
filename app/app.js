var app = angular.module("app", ['ngRoute', 'api', 'routing', 'ng-fastclick']);

    // Index Controller
    app.controller("indexCtrl", ["$scope", "$route", "shows", function($scope, $route, shows) {
        $scope.search = "";
        $scope.data = {};
        $scope.loaded = false;
        $scope.titleLength = 13;

        // Clear an input
        $scope.clear = function(input) {
            $scope[input] = "";
        };

        $scope.location = $route.current;

        // Load the content from the API
        shows.get({}, function(series){
            $scope.data = series.data;
            $scope.loaded = true;
            localStorage.setItem('series', JSON.stringify(series));
        });
    }]);
