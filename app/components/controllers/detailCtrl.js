app.controller("detailCtrl", [
    "$scope", "$location", 'serviceStorage',
    function($scope, $location, serviceStorage) {
        $scope.loaded = true;
        $scope.showDetail = false;
        $scope.charLimit = 200;
        $scope.detail = serviceStorage.get('series') || $location.path("/");

        $scope.showMore = function() {
            $scope.showDetail = (!$scope.showDetail);
            $scope.charLimit = 10000;
        };
}]);