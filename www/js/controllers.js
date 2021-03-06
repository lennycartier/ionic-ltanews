angular.module('starter.controllers', [])

.filter('slug', function () {
	return function (input) {
		if (input) {
			return input.replace(/Durée :/g,"");;
		}
	};
})

.filter('ifEmpty', function() {
	return function(input, defaultValue) {
		if (angular.isUndefined(input) || input === null || input === '') {
			return defaultValue;
		}
		return input;
	}
})

.controller('AgendaCtrl', function($scope, $ionicLoading, $cordovaGoogleAnalytics, agendaService, Settings) {

	$scope.$on('$ionicView.afterEnter', function(){
	  $cordovaGoogleAnalytics.trackView('app.agenda');
	  $scope.rssnb = Settings.getOptions('RssNb');
	});

	$ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });

	 $scope.init = function() { // get data from import.io service and fill the scope
		 agendaService.getEvents().success(function(data, status, headers, config) {
			 $ionicLoading.hide();
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

.controller('Agenda2Ctrl', function($scope, $ionicLoading, $cordovaGoogleAnalytics, Settings, eventService) {
/*	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	}); */

	$scope.init = function() {
		eventService.getPage();
		$scope.events = eventService.events;
	};


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

.controller('TweetsCtrl', function($scope, $ionicLoading, $cordovaGoogleAnalytics, tweetService, Settings) {

	$scope.$on('$ionicView.afterEnter', function(){
	  $cordovaGoogleAnalytics.trackView('app.tweets');
	  $scope.tweetsnb = Settings.getOptions('TwNb');
	});

	$ionicLoading.show({
	    content: 'Chargement',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });

	$scope.init = function() { // get data from twitter proxy service and fill the scope

		var x2js = new X2JS();
		$scope.tweets = [];

		tweetService.getTweets().success(function(data, status, header, config) {
			tweetlist = x2js.xml_str2json(data);
			$ionicLoading.hide();
			$scope.tweets = tweetlist.entries.entry;
		}).error(function(data, status, headers, config) {
			console.log("status : " + status + " FAILURE!");
		});
	}

	$scope.doRefresh = function() {
		var x2js = new X2JS();
		tweetService.getTweets().success(function(data, status, header, config) {
			tweetlist = x2js.xml_str2json(data);
			$scope.tweets = tweetlist.entries.entry.concat($scope.tweets);
		}).error(function(data, status, headers, config) {
			console.log("status : " + status + " FAILURE!");
		});
		$scope.$broadcast('scroll.refreshComplete');
	};


 $scope.browse = function(v) { // get Rss details by opening inAppBrower
	 window.open(v, "_self", "location=yes");
 };

 $scope.predicate = '+';
 $scope.reverse = false;
 $scope.order = function(predicate) {
   $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
   $scope.predicate = predicate;
 };


})

// SETTINGS

.controller('SettingsCtrl', function($scope, $localStorage, $locale, $cordovaGoogleAnalytics, Settings) {

 $scope.$on('$ionicView.afterEnter', function(){
  $cordovaGoogleAnalytics.trackView('app.settings');
  });

  $scope.rss = {}; // init form
  $scope.tweets = {};

  Settings.getOptions('RssNb'); // dirty fix
  Settings.getOptions('TwNb');

  $scope.rss.nb = Settings.RssNb;
  $scope.tweets.nb = Settings.TwNb;

 // $scope.localerecup = $locale.id;

  $scope.setRssNb = function() { // save how many rss items to fetch
    Settings.setOptions('RssNb',$scope.rss.nb);
  }
  $scope.setTwNb = function() { // save how many tweets items to fetch
    Settings.setOptions('TwNb', $scope.tweets.nb);
  }

});
