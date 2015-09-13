angular.module('starter.services')

.service('Settings', function($localStorage) {

  var settings = {};

  settings.setOptions = function(key, value) {
    console.log("dans setoptions");
      $localStorage[key] = value;
      settings[key] = $localStorage[key];
    }

  settings.getOptions = function(key) {
    console.log("Dans getOptions");
    settings[key] = $localStorage[key];
    return settings[key];
  }


/*  settings.options = [ 5, 10, 15 ];
  /*  {'id': 5, 'value': 5 },
    {'id': 10, 'value': 10 },
    {'id': 15, 'value': 15 }
  ]*/

  //settings.setnbRss = 2;

/* settings.getOptions = function() {
    console.log("Dans getOptions");
    settings.setnbRss = $localStorage.setnbRss;
    console.log("getOption : " + settings.setnbRss);
    if (settings.setnbRss === undefined) {
      console.log("setnbRss est undefined");
      $localStorage.setnbRss = 0;
      settings.setnbRss = $localStorage.setnbRss;
      console.log("valeur de setnbRss maintenant : " + settings.setnbRss);
    }
    return settings.setnbRss;
  }

/*  settings.setOptions = function(key, value) {
    $localStorage[key] = value;
    settings[key] = $localStorage[key];
  } */


/*options.saveOptions = function(value, key) {
    $localStorage[key] = value;
    settings[key] = $localStorage[key];
  }*/

  return settings;
});
