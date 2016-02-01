angular.module('starter.services')

.factory('feedService', ["$http", function($http) {
	var feedService = {};
	feedService.serve = function(api, url, nb) {
		return $http.get(api, { params: { "v": "1.0", "num": nb, "q": url} });
	}
	return feedService;
}])
  
.factory('agendaService', function($http) {
	var getEvents = function() {	
			return $http.get('http://assets.datanotes.org/latechamienoise/agenda.out');	
	}; 
	return {
		getEvents: getEvents
	};	
})

.factory('tweetService', function($http) {
	var getTweets = function() {	
			return $http.get('http://assets.datanotes.org/latechamienoise/twitterfeed.php');	
	}; 
	return {
		getTweets: getTweets
	};	
})