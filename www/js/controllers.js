angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AgendaCtrl', function($http, $scope) {
  $scope.init = function() {
    $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num": "10", "q": "http://www.latechamienoise.com/agenda/do/rss.xml"} })
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

.controller('TweetsCtrl', function($http, $scope) {
  $scope.init = function() {
    $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num": "10", "q": "https://script.google.com/macros/s/AKfycbzy-FtnGEkBBShFym_H5-Y-70VCmurJ8POeYzTCHhStt75t8ew/exec?641366336325701632"} })
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
});
