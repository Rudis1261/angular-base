app.controller("detailCtrl", [
    "$scope", "$routeParams", "$location", "$anchorScroll", "$timeout", 'serviceStorage', 'shows',
    function($scope, $routeParams, $location, $anchorScroll, $timeout, serviceStorage, shows) {

        $scope.episodeTitle = function(episode) {
            return "S" + ("00"+episode.s).slice(-2) + "E" + ("00"+episode.e).slice(-2);
        };

        $scope.scrollToSeasons = function(){
            $anchorScroll('seasons');
        };

        $scope.loadEpisodes = function() {
            shows.get({ 'action': 'episodes', 'id': $scope.detail.seriesid }, function(respondData){
                $scope.episodeList = respondData.episodes;
                $timeout($scope.scrollToSeasons, 300);
                $scope.loaded = true;
            });
        };

        $scope.setPage = function(page){
            if (!$scope.page) {
                $scope.loadEpisodes();
            }
            $scope.page = page;
            $location.path('/detail/' + $routeParams.showName + '/' + $routeParams.showId + '/' + $scope.page, false);
            $scope.scrollToSeasons();
        };

        $scope.showMore = function() {
            $scope.charLimit = 100000;
        };

        $scope.showLess = function() {
            $scope.charLimit = $scope.originalCharLimit;
        };

        $scope.charLimit = $scope.originalCharLimit = 100;
        $scope.detail = serviceStorage.get('show') || false;
        $scope.episodeList = [{
            'name': 'casta',
        },{
            'name': 'casta',
        },{
            'name': 'casta'
        }];

        // If scope was passed in via serviceStorage load it
        if ($scope.detail) {
            $scope.loaded = true;
        }

        // Get the page from the route
        $scope.page = $routeParams.page || false;
        if ($scope.detail && $scope.page) {
            $scope.loadEpisodes();
        }

        // Otherwise we will need to find the single show to display
        if (!$scope.detail) {
            shows.get({'action': 'shows'}, function(responseData){
                var showDetail = _.where(responseData.series, { seriesid: $routeParams.showId });
                if (_.isEmpty(showDetail)) {
                    $location.path("/failure");
                }

                $scope.detail = _.first(showDetail);
                if ($scope.page) {
                    $scope.loadEpisodes();
                }
                $scope.loaded = true;
            });
        }
}]);