var app = angular.module("app", ['ngResource']);

    // Index Controller
    app.controller("indexCtrl", ["$scope", "$resource", function($scope, $resource) {
        $scope.search = "";
        $scope.loaded = false;
        $scope.data = {};
        $scope.titleLength = 13;
        $scope.cacheTime = 60;

        // Clear an input
        $scope.clear = function(input) {
            $scope[input] = "";
        };

        // Load content from the API
        var seriesData = JSON.parse(sessionStorage.getItem('series'));
        var now = Math.round(new Date() / 1000);
        if (!seriesData || (now - seriesData.timestamp) > $scope.cacheTime) {
            var apiEndpoint = "https://tvtracker.co.za/api/0.1";
            //var apiEndpoint = "http://dev.tvtracker.co.za/api/0.1";
            var seriesApi = $resource(apiEndpoint);
            var series = seriesApi.get({}, function(){
                $scope.data = series.data;
                $scope.loaded = true;
                sessionStorage.setItem('series', JSON.stringify(series));
            });
        } else {
            $scope.data = seriesData.data;
            $scope.loaded = true;
        }
    }]);
