// This is the JS file for the Firebase data



 // ========Initialize Firebase=========
// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyA1XI9xxScQ1bRjHmi8c9mVbzFpADIICLM",
	authDomain: "yelptest-bcf7a.firebaseapp.com",
	databaseURL: "https://yelptest-bcf7a.firebaseio.com",
	storageBucket: "yelptest-bcf7a.appspot.com",
	messagingSenderId: "595638809354"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref().push();


  // Create a new GeoFire instance at the random Firebase location
  var geoFire = new GeoFire(database);
  
    /* Callback method from the geolocation API which receives the current user's location */
  var geolocationCallback = function(location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

    var username = "wesley";
    geoFire.set(username, [latitude, longitude]).then(function() {
      log("Current user " + username + "'s location has been added to GeoFire");

      // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
      // remove their GeoFire entry
      firebaseRef.child(username).onDisconnect().remove();

      log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
    }).catch(function(error) {
      log("Error adding user " + username + "'s location to GeoFire");
    });
  }