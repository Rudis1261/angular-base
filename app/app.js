var app = angular.module("app", ['ngResource']);

    // Index Controller
    app.controller("indexCtrl", ["$scope", "$resource", function($scope, $resource) {
        $scope.search = "";
        $scope.loaded = false;
        $scope.data = {};

        var seriesData = $scope.series;
        var apiEndpoint = "https://tvtracker.co.za/api/0.1";
        //var apiEndpoint = "http://dev.tvtracker.co.za/api/0.1";
        var seriesApi = $resource(apiEndpoint);
        var series = seriesApi.get({}, function(){
            $scope.data = series.data;
            $scope.loaded = true;
        });

        $scope.filterSeries = function() {

        };
    }]);
