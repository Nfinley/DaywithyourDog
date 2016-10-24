//displayYelpResults();


//  ======= YELP API NODE CALL ===============
// Request API access: http://www.yelp.com/developers/getting_started/api_access

var Yelp = require('yelp');

var config = require('./config.json');

var firebase = require('firebase');

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAv-6bOhqHPkkst-Aw7ULPb-xvTqHqTpeo",
    authDomain: "bars-backup.firebaseapp.com",
    databaseURL: "https://bars-backup.firebaseio.com",
    storageBucket: "bars-backup.appspot.com",
    messagingSenderId: "149078553518"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var yelp = new Yelp({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  token: config.token,
  token_secret: config.tokenSecret
});

var AustinZipcodes = ['78701', '78702', '78703', '78704', '78705', '78710', '78712', '78717', '78719', '78721', '78722', '78723', '78724', '78725', '78726', '78727', '78728', '78729', '78730', '78731', '78732', '78733', '78734', '78735', '78736', '78737', '78738', '78739', '78741', '78742', '78744', '78745', '78746', '78747', '78748', '78749', '78750', '78751', '78752', '78753', '78754', '78756', '78757', '78758', '78759', '78799'];

for (var k = 0; k < AustinZipcodes.length; k++){
	var zipcode = AustinZipcodes[k];

	for (var j = 0; j < 50; j++){
		//See http://www.yelp.com/developers/documentation/v2/search_api
		yelp.search({ term: 'bars dogs allowed', location: zipcode, limit: j})
		.then(function (data) {
			console.log(data);
			var results = data.businesses;


			for (var i = 0; i < results.length; i++){

		 		var name = results[i].name;
		        var image = results[i].snippet_image_url;
		  		var lat = results[i].location.coordinate.latitude;
		  		var lng = results[i].location.coordinate.longitude;
		  		var address = results[i].location.display_address["0"] + ", ATX";
		  		var phone = results[i].display_phone;
		  		var yelpURL = results[i].url;
		  		var id = results[i].id;

		  		console.log(results);

				database.ref('bars/' + id).set({
					id: id,
					name: name,
					image: image,
					loc:{
						lat: lat,
						lng: lng},
					address: address,
					phone: phone,
					url: yelpURL
				});
		  }

		})
		.catch(function (err) {
		  console.error(err);
		});
 	}
}
