angular.module('starter.services')

.service('Feed', function($http, $scope) {

  var feed = {};

  feed.serve = function(api, url) {
    $http.get(api, { params: { "v": "1.0", "num": "10", "q": url} })
        .success(function(data) {
            feed.rssTitle = data.responseData.feed.title;
            feed.rssUrl = data.responseData.feed.feedUrl;
            feed.rssSiteUrl = data.responseData.feed.link;
            feed.entries = data.responseData.feed.entries;
        })
        .error(function(data) {
            console.log("ERROR: " + data);
        });
      }
  }





});
