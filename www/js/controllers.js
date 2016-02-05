angular.module('starter.controllers', [])

.filter('slug', function () {
   return function (input) {
     if (input) {
       return input.replace(/Durée :/g,"");;
     }
   };
 })

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
	
		var x2js = new X2JS();
		$scope.tweets = [];
		
		tweetService.getTweets().success(function(data, status, header, config) {
			tweetlist = x2js.xml_str2json(data);
			console.log(tweetlist.entries.entry);
			$scope.tweets = tweetlist.entries.entry;
		}).error(function(data, status, headers, config) {
			console.log("status : " + status + " FAILURE!");
		});
	}
	
	
})

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