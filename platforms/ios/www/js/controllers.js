angular.module('starter.controllers', [])

.filter('slug', function () {
   return function (input) {
     if (input) {
       return input.replace(/Durée :/g,"");;
     }
   };
 })

.controller('AgendaCtrl', function($scope, $locale, $http, feedService, Settings) {

  $scope.$on('$ionicView.enter', function() { // refreshing view on enter
    //$scope.init();
  });

//https://api.import.io/store/connector/b33f67ca-44a3-4916-a569-388589b705fa/_query?input=webpage/url:http%3A%2F%2Fwww.latechamienoise.com%2Fagenda%2F2%2F&&_apikey=3471fb8c288e41838797b0f9eef59c915a3e33e918617ccc19d9ef1edcf5bb9be1a8f373b514f80be37ed0e399e8fca21792d7d73e46d4269074b1e7c4800fa7490e2a1f26868ba97881ca475a2afba3


/*  $scope.init = function() { // get data from service and fill the scope
    var nb = Settings.getOptions('RssNb');
    //feedService.serve("http://ajax.googleapis.com/ajax/services/feed/load", "http://www.latechamienoise.com/agenda/do/rss.xml", nb)
    //feedService.serve("http://ajax.googleapis.com/ajax/services/feed/load", "http://www.latechamienoise.com/agenda/do/rss.xml", 20)
	feedService.serve("http://ajax.googleapis.com/ajax/services/feed/load", "https://api.import.io/store/connector/b33f67ca-44a3-4916-a569-388589b705fa/_query?input=webpage/url:http%3A%2F%2Fwww.latechamienoise.com%2Fagenda%2F2%2F&&_apikey=3471fb8c288e41838797b0f9eef59c915a3e33e918617ccc19d9ef1edcf5bb9be1a8f373b514f80be37ed0e399e8fca21792d7d73e46d4269074b1e7c4800fa7490e2a1f26868ba97881ca475a2afba3", 20)
    .success(function(data) {
      //$scope.rssTitle = data.responseData.feed.title;
      //$scope.rssUrl = data.responseData.feed.feedUrl;
      //$scope.rssSiteUrl = data.responseData.feed.link;
      //var rssPubDate = data.responseData.feed.publishedDate;
      //$scope.entries = data.responseData.feed.entries;
      $entries = [];
      for (var i = 0; i < data.responseData.feed.entries.length; i++)
        {
          var entry = data.responseData.feed.entries[i];
          var title = entry.title;
          var entryDate = new Date(entry.publishedDate);
          var desc = entry.contentSnippet;
          $entries.push({id : i, title : title, date : entryDate, extrait: desc })
          //cprout = entryDate;
          console.log('entry num : ' + i);
          console.log('titre : ' + title);
          console.log('date : ' + entryDate);
          console.log('extrait : ' + desc);
      };
    })
    .error(function(data) {
      console.log("ERROR: " + data);
    });
    $scope.browse = function(v) { // get Rss details by opening inAppBrower
      window.open(v, "_self", "location=yes");
    }
  } */
  
$scope.init = function() { // get data from import.io service and fill the scope
	$scope.event = {};
	$scope.event.date = '';
	 
	console.log("init recuperation flux");
	$http.get('http://assets.datanotes.org/latechamienoise/agenda.out')
	.success(function(data, status, headers, config) { 
		console.log("status : " + status + " SUCCESS!");
		$scope.events = data.results;
	}).error(function(data, status, headers, config) {
		console.log("status : " + status + " FAILURE!");
	});	
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

.controller('SettingsCtrl', function($scope, $localStorage, $locale, Settings) {

  $scope.rss = {}; // init form
  $scope.tweets = {};

  Settings.getOptions('RssNb'); // dirty fix
  Settings.getOptions('TwNb');

  $scope.rss.nb = Settings.RssNb;
  $scope.tweets.nb = Settings.TwNb;

  $scope.localerecup = $locale.id;

  $scope.setRssNb = function() { // save how many rss items to fetch
    Settings.setOptions('RssNb',$scope.rss.nb);
  }
  $scope.setTwNb = function() { // save how many tweets items to fetch
    Settings.setOptions('TwNb', $scope.tweets.nb);
  }

});
