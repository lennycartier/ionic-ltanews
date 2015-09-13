angular.module('starter.controllers', [])

.controller('AgendaCtrl', function($scope, feedService, Settings) {
$scope.init = function() {
  var nb = Settings.getOptions('RssNb');
  console.log("Valeur de RssNb = " + Settings.RssNb);
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
      $scope.browse = function(v) {
      window.open(v, "_self", "location=yes");
  }
}
$scope.number = nb;
})

.controller('TweetsCtrl', function($scope, feedService, Settings) {
  $scope.init = function() {
    console.log("Valeur de TwNb = " + Settings.TwNb);
    feedService.serve("http://ajax.googleapis.com/ajax/services/feed/load", "https://script.google.com/macros/s/AKfycbzy-FtnGEkBBShFym_H5-Y-70VCmurJ8POeYzTCHhStt75t8ew/exec?641366336325701632")
        .success(function(data) {
            $scope.rssTitle = data.responseData.feed.title;
            $scope.rssUrl = data.responseData.feed.feedUrl;
            $scope.rssSiteUrl = data.responseData.feed.link;
            $scope.entries = data.responseData.feed.entries;
        })
        .error(function(data) {
            console.log("ERROR: " + data);
        });
      }
      $scope.browse = function(v) {
      window.open(v, "_self", "location=yes");
  }
})

.controller('SettingsCtrl', function($scope, $localStorage, Settings) {

  $scope.rss = {};
  $scope.tweets = {};

  $scope.setRssNb = function() {
    console.log("setRssNb !!");
    //var RssNb = $scope.rss.nb;
    Settings.setOptions('RssNb',$scope.rss.nb);
    //$localStorage.RssNb = $scope.rss.nb;
    console.log("nouvelle valeur = " + $localStorage.RssNb);
  }
  $scope.setTwNb = function() {
    console.log("setTwNb !!");
    //var TwNb = $scope.tweets.nb
    Settings.setOptions('TwNb', $scope.tweets.nb);
    //$localStorage.TwNb = $scope.tweets.nb;
    console.log("nouvelle valeur = " + $localStorage.TwNb);
  }

});
