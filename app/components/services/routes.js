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
      .when('/detail/:showName/:showId', {
        templateUrl: 'assets/pages/detail.html',
        controller: 'detailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  });