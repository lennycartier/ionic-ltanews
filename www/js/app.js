// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngSanitize', 'starter.services', 'ngStorage', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
var googleanalyticsApp = angular.module('googleanalytics', ['ionic'])
    .run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(typeof analytics !== undefined) {
                analytics.startTrackerWithId("UA-18564279-17");
            } else {
                console.log("Google Analytics Unavailable");
            }
        });
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl',
        cache: 'false'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.agenda', {
      url: '/agenda',
      views: {
        'menuContent': {
          templateUrl: 'templates/agenda.html',
          controller: 'AgendaCtrl',
          cache: 'false'
        }
      }
    })
    .state('app.tweets', {
      url: '/tweets',
      views: {
        'menuContent': {
          templateUrl: 'templates/tweets.html',
          controller: 'TweetsCtrl'
        }
      }
    })
    .state('app.apropos', {
        url: '/apropos',
        views: {
          'menuContent': {
            templateUrl: 'templates/apropos.html'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/agenda');

});
