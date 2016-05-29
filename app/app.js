var app = angular.module("app", ['ngRoute','ngLocalStorage', 'api', 'routing', 'ng-fastclick']);

    app.run(function ($anchorScroll) {
        $anchorScroll.yOffset = 60;
    });

    app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }]);

    app.config(function ($httpProvider) {
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.get = {};
      $httpProvider.defaults.withCredentials = true;

      $httpProvider.defaults.cache = true;
    });

    // Index Controller
    app.controller("indexCtrl", [
        "$scope", "$localStorage", "$route", "shows", "serviceStorage", "$location",
        function($scope, $localStorage, $route, shows, serviceStorage, $location) {

            $scope.search = "";
            $scope.state = $localStorage.get('stateSwitcher');
            if (!$scope.state || $scope.state == 'all') {
                $scope.state = false;
            }
            $scope.data = {};
            $scope.loaded = false;
            $scope.titleLength = 13;
            $scope.perpage = 60;
            $scope.page = 1;
            $scope.paging = $scope.perpage * $scope.page;
            $scope.scrollToTop = false;

            // Clear an input
            $scope.clear = function(input) {
                $scope[input] = "";
            };

            $scope.scrollToTheTop = function() {
                window.scrollTo(0, 0);
            };

            $scope.pageUp = function() {
                $scope.page++;
                $scope.paging = $scope.perpage * $scope.page;
            };

            $scope.listContext = function(state) {
                switch(state) {
                    case 'ended':
                        $localStorage.put('stateSwitcher', 'Ended');
                        $scope.state = 'Ended';
                        break;
                    case 'all':
                        $localStorage.put('stateSwitcher', 'all');
                        $scope.state = false;
                        break;
                    case 'continuing':
                    default:
                        $localStorage.put('stateSwitcher', 'Continuing');
                        $scope.state = 'Continuing';
                        break;
                }
            };

            // Detail specific context
            $scope.setDetail = function(data) {
                serviceStorage.set('show', data);
            };

            $scope.location = $route.current;

            // Load the content from the API
            shows.get({'action': 'shows'}, function(responseData){
                $scope.data = responseData;
                if ($scope.showId) {
                    $scope.data = $scope.responseData;
                }
                $scope.loaded = true;
            });
        }]);
