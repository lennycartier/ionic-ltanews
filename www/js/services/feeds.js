angular.module('starter.services')

.factory('feedService', ['$http', function($http) {
	var feedService = {};
	feedService.serve = function(api, url, nb) {
		return $http.get(api, { params: { "v": "1.0", "num": nb, "q": url} });
	}
	return feedService;
}])

.factory('agendaService', function($http) {
	var getEvents = function() {
			return $http.get('http://assets.datanotes.org/latechamienoise/agenda2.out');
	};
	return {
		getEvents: getEvents
	};
})

.factory('eventService', ['$http', function($http) {
	var events = [];
	var getPage = function() {
		console.log('- lancement du get -');
		$http.get('http://assets.datanotes.org/latechamienoise/agenda.txt',
		{
			transformResponse: function(response) {
				return response;
			}
		}).then(function successCallback(response) {


			var tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = response.data;
			//	console.log(response.data);

			var items = $(tmp.body.children).find('.media-body');
			var dates = $(tmp.body.children).find('.media-body').children('ul').children('li').first();
			console.log("Items found : " + items.length);
			console.log("Dates found : " + dates.length);

			for (var i = 0; i < items.length; i++) {
				var event = {
					subject: $(items[i]).children('h2')[0].innerText,
					date: $(items[i]).children('ul').children('li')[0].innerText.trim(),
					location: $(items[i]).children('ul').children('li')[1].innerText.trim()
				};
				events.push(event);

				console.log ("Item description : " + $(items[i]).children('h2')[0].innerText);
				console.log ("|--> date : " + $(items[i]).children('ul').children('li')[0].innerText.trim());
				console.log ("|--> lieu : " + $(items[i]).children('ul').children('li')[1].innerText.trim())
			}

			console.log('prout');
			//$scope.events = events;
			console.log(events[0].Description);
			//$scope.ahah = events[1].Description;
			//$scope.output = response.data;
		}, function errorCallback(response, status, headers, config) {
			console.log('- FAILURE = ' + response.status );
			status = response.status;
			output = response.config;
		});
	};

	return {
		getPage: getPage,
		events : events,
		//status : status,
		//output : output
	};
}])

.factory('tweetService', function($http) {
	var getTweets = function() {
			return $http.get('http://assets.datanotes.org/latechamienoise/twitterfeed.php');
	};
	return {
		getTweets: getTweets
	};
})
