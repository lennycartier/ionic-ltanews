angular.module('starter.services')

.factory('feedService', ["$http", function($http) {
  var feedService = {};
  feedService.serve = function(api, url, nb) {
    return $http.get(api, { params: { "v": "1.0", "num": nb, "q": url} });
      }
  return feedService;
  }])
