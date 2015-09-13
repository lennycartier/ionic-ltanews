angular.module('starter.services')

.service('Settings', function($localStorage) {

  var settings = {};

  settings.setOptions = function(key, value) {
      $localStorage[key] = value;
      settings[key] = $localStorage[key];
    }

  settings.getOptions = function(key) {
    settings[key] = $localStorage[key];
    if (settings[key] === undefined) {
      $localStorage[key] = 10;
      settings[key] = $localStorage[key];
    }
    return settings[key];
  }

  return settings;
});
