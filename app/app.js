var app = angular.module("app", []);
    app.controller("indexCtrl", ["$scope", function($scope){
        $scope.message = "World!";
    }]);