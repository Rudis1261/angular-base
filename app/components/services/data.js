angular.module('api', ['ngResource'])
.factory('shows', ["$resource", function($resource) {

  var cacheTime = 300;
  var seriesData = JSON.parse(localStorage.getItem('series')) || false;
  var now = Math.round(new Date() / 1000);

  // Still within Cache time, return the sudo version using sessionStorage
  if (seriesData && (now - seriesData.timestamp) < cacheTime) {
    return {
      get: function(params, fn){
        return fn(seriesData);
      },
    };
  };

  // Baring a cached version, return the AJAX Response
  var apiEndpoint = "https://tvtracker.co.za/api/0.1";
  //var apiEndpoint = "http://dev.tvtracker.co.za/api/0.1";
  var api = $resource(apiEndpoint);
  return {
    get: api.get,
  };
}]);
