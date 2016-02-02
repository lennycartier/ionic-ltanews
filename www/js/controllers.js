angular.module('starter.controllers', [])

.filter('slug', function () {
   return function (input) {
     if (input) {
       return input.replace(/Durée :/g,"");;
     }
   };
 })

// AGENDA : ok

.controller('AgendaCtrl', function($scope, $http, agendaService, Settings) {

	 $scope.init = function() { // get data from import.io service and fill the scope
		 $scope.rssnb = Settings.getOptions('RssNb');
		 agendaService.getEvents().success(function(data, status, headers, config) {
			 $scope.events = data.results;
		 }).error(function(data, status, headers, config) {
			 console.log("status : " + status + " FAILURE!");
		 });
	 }
	 
	 $scope.browse = function(v) { // get Rss details by opening inAppBrower
		 window.open(v, "_self", "location=yes");
	 };
	 
     $scope.predicate = '+';
     $scope.reverse = true;
     $scope.order = function(predicate) {
       $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
       $scope.predicate = predicate;
     };
})

.controller('TweetsCtrl', function($scope, $http, tweetService, Settings) {

	$scope.init = function() { // get data from twitter proxy service and fill the scope
	
	tweetService.getTweets().success(function(data, status, header, config) {
		$scope.tweets = JSON.stringify(data);
		prout = JSON.stringify(data);
		 console.log("sortie tweets : " + prout);
		/* for (i = 0; i < data.results.length; i++) {
			console.log(data.results[i].date);
			if (angular.isArray(data.results[i].date)) {
				console.log("tableau : " + data.results[i].date);
			}
		} */
	}).error(function(data, status, headers, config) {
		console.log("status : " + status + " FAILURE!");
	});
  }
})



// TWEETS : to fix

/* .controller('TweetsCtrl', function($scope, feedService, Settings) {

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
}) */

// SETTINGS

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