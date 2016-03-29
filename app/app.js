var app = angular.module("app", ['api']);

    // Index Controller
    app.controller("indexCtrl", ["$scope", "shows", function($scope, shows) {
        $scope.search = "";
        $scope.data = {};
        $scope.loaded = false;
        $scope.titleLength = 13;

        // Clear an input
        $scope.clear = function(input) {
            $scope[input] = "";
        };

        // Load the content from the API
        shows.get({}, function(series){
            $scope.data = series.data;
            $scope.loaded = true;
            localStorage.setItem('series', JSON.stringify(series));
        });
    }]);
