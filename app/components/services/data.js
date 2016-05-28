angular.module('api', ['ngResource'])
.factory('shows', ["$http", "$cacheFactory", "$location", function($http, $cacheFactory, $location) {

  // Baring a cached version, return the AJAX Response
  //var apiEndpoint = "https://tvtracker.co.za/api/0.1/:action/:id";
  //var apiEndpoint = "http://dev.tvtracker.co.za/api/0.1/:action/:id";
  //var api = $resource(apiEndpoint);
  //console.log(cacheService.info())

  var getFromApi = function(params, callback) {

    //var httpCache = $cacheFactory.get('$http');
    //console.log(params);
    //console.log(httpCache.info());
    //console.log(httpCache);
    var endPoint = 'https://tvtracker.co.za/api/0.1/:action/:id';

    // Interpolate the URL
    var parts = endPoint.split('/:');
    angular.forEach(parts, function(element, index) {
      if (params[element]) {
        endPoint = endPoint.replace(":"+element, params[element]);
      } else {
        endPoint = endPoint.replace(":"+element, "");
      }
    });

    // Cache middle ware
    var cacheTime = 3000;
    var cached = JSON.parse(localStorage.getItem(endPoint)) || false;
    var now = Math.round(new Date() / 1000);
    if (cached && (now - cached.timestamp) < cacheTime) {
      console.log("JSON still cached, serving it");
      return callback(cached.data);
    }

    // Otherwise return on the HTTP result
    return $http.get(endPoint, {
      timeout: 10000,
    })
    .success(function(response){
      localStorage.setItem(endPoint, JSON.stringify(response));
      return callback(response.data);
    })
    .error(function(response){
      if (!response) {
        return $location.path("/failure");
      }
      switch (response.status) {
        case 400:
        case 401:
            $location.path("/login");
            break;
        default:
            $location.path("/failure");
            break;
      }
    });
  };

  return {
    get: getFromApi
  };
}]);
