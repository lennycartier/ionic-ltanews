angular.module('starter.services')

.factory('eventService', ['$http', function($http) {
	var events = [];
	var getPage = function() {
		$http.get('http://assets.datanotes.org/latechamienoise/agenda.txt',
		{
			transformResponse: function(response) {
				return response;
			}
		}).then(function successCallback(response) {

			var tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = response.data;

			var items = $(tmp.body.children).find('.media-body');

			for (var i = 0; i < items.length; i++) {
				var event = {
					subject: $(items[i]).children('h2')[0].innerText,
					date: $(items[i]).children('ul').children('li')[0].innerText.trim(),
					location: $(items[i]).children('ul').children('li')[1].innerText.trim(),
					ltaurl: $(items[i]).children('h2').children('a')[0].href,
				};

			// if ($(items[i]).children('ul').children('li')[2].childNodes.length > 2) {
			//	console.log("toto");
			//}


				events.push(event);

				console.log('Item description :' + event.subject);
				console.log('|--> date : ' + event.date);
				console.log('|--> lieu : ' + event.location);
				console.log('|--> ltaurl : ' + event.ltaurl);

				if (typeof event.eventbrite != "undefined") {
   				console.log("GOT THERE");
					console.log('|--> eventbrite : ' + event.eventbrite);
				}
			}

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
