angular.module('starter.controllers', [])

.controller('AgendaCtrl', function($scope, feedService, Settings) {

  $scope.$on('$ionicView.enter', function() { // refreshing view on enter
    $scope.init();
  });

  $scope.init = function() { // get data from service and fill the scope
    var nb = Settings.getOptions('RssNb');
    feedService.serve("http://ajax.googleapis.com/ajax/services/feed/load", "http://www.latechamienoise.com/agenda/do/rss.xml", nb)
    .success(function(data) {
      $scope.rssTitle = data.responseData.feed.title;
      $scope.rssUrl = data.responseData.feed.feedUrl;
      $scope.rssSiteUrl = data.responseData.feed.link;
      $scope.entries = data.responseData.feed.entries;
    })
    .error(function(data) {
      console.log("ERROR: " + data);
    });
    $scope.browse = function(v) { // get Rss details by opening inAppBrower
      window.open(v, "_self", "location=yes");
    }
  }
})

.controller('TweetsCtrl', function($scope, feedService, Settings) {

  $scope.$on('$ionicView.enter', function() { // refreshing view on enter
    $scope.init();
  });

  $scope.init = function() { // get data from service and fill the scope
    var nb = Settings.getOptions('TwNb');
    feedService.serve("http://ajax.googleapis.com/ajax/services/feed/load", "https://script.google.com/macros/s/AKfycbzy-FtnGEkBBShFym_H5-Y-70VCmurJ8POeYzTCHhStt75t8ew/exec?641366336325701632", nb)
    .success(function(data) {
      $scope.rssTitle = data.responseData.feed.title;
      $scope.rssUrl = data.responseData.feed.feedUrl;
      $scope.rssSiteUrl = data.responseData.feed.link;
      $scope.entries = data.responseData.feed.entries;
    })
    .error(function(data) { // get Rss details by opening inAppBrower
      console.log("ERROR: " + data);
    });
  }
  $scope.browse = function(v) {
    window.open(v, "_self", "location=yes");
  }
})

.controller('SettingsCtrl', function($scope, $localStorage, Settings) {

  $scope.rss = {}; // init form
  $scope.tweets = {};

  Settings.getOptions('RssNb'); // dirty fix
  Settings.getOptions('TwNb');

  $scope.rss.nb = Settings.RssNb;
  $scope.tweets.nb = Settings.TwNb;

  $scope.setRssNb = function() { // save how many rss items to fetch
    Settings.setOptions('RssNb',$scope.rss.nb);
  }
  $scope.setTwNb = function() { // save how many tweets items to fetch
    Settings.setOptions('TwNb', $scope.tweets.nb);
  }

});
