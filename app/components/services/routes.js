angular.module('routing', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'assets/pages/list.html',
        controller: 'indexCtrl'
      })
      .when('/login', {
        templateUrl: 'assets/pages/login.html',
        controller: 'loginCtrl'
      })
      .when('/failure', {
        templateUrl: 'assets/pages/failure.html',
        controller: 'indexCtrl'
      })
      .when('/detail/:showName/:showId/:page?', {
        templateUrl: 'assets/pages/detail.html',
        controller: 'detailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  });

angular.module('reload-service', [])
  .factory('reloadService', function($route, $timeout, $location) {
    return {
       preventReload: function($scope, navigateCallback) {
          var lastRoute = $route.current;

          $scope.$on('$locationChangeSuccess', function() {
             if (lastRoute.$$route.templateUrl === $route.current.$$route.templateUrl) {
                var routeParams = angular.copy($route.current.params);
                $route.current = lastRoute;
                navigateCallback(routeParams);
             }
          });
       }
    };
  });
