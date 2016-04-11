app.controller("detailCtrl", [
    "$scope", "$routeParams", "$location", 'serviceStorage', 'shows',
    function($scope, $routeParams, $location, serviceStorage, shows) {

        $scope.charLimit = $scope.originalCharLimit = 100;
        $scope.detail = serviceStorage.get('series') || false;

        // If scope was passed in via serviceStorage load it
        if ($scope.detail) {
            $scope.loaded = true;
        }

        // Otherwise we will need to find the single show to display
        if (!$scope.detail) {
            shows.get({}, function(res){
                var showDetail = _.where(res.data.series, {seriesid: $routeParams.showId});
                if (_.isEmpty(showDetail)) {
                    $location.path("/failure");
                }

                $scope.detail = _.first(showDetail);
                $scope.loaded = true;

            // Failure
            }, function(res){
                switch (res.status) {
                    case 400:
                    case 401:
                        $location.path("/login");
                        break;
                    default:
                        $location.path("/failure");
                        break;
                }
            });
        }

        $scope.showMore = function() {
            $scope.charLimit = 100000;
        };

        $scope.showLess = function() {
            $scope.charLimit = $scope.originalCharLimit;
        };
}]);