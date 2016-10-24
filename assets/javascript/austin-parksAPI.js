

 // ========Initialize Firebase=========

var config = {
  apiKey: "AIzaSyAv-6bOhqHPkkst-Aw7ULPb-xvTqHqTpeo",
  authDomain: "bars-backup.firebaseapp.com",
  databaseURL: "https://bars-backup.firebaseio.com",
  storageBucket: "bars-backup.appspot.com",
  messagingSenderId: "149078553518"
};
firebase.initializeApp(config);

// Initialize variable for any database querying
var dbQuery = firebase.database();

// Array for the park info
var parkInfo = [];

// ======== AUSTIN PARKS API===============


// Austin Parks API
$.ajax({
    url: "https://data.austintexas.gov/resource/up6y-6ww4.json",
    type: "GET",
    data: {
        "$limit": 5000,
        "$$app_token": "BpQTL15Fi3PePMZUluMK7cKFy"
    }
}).done(function (response) {


    var info = response;


    console.log(response);

    // Cleaning up data from the API
    for (i = 0; i < response.length; i++) {

        response[i].descriptio = response[i].descriptio.replace(
                /<DIV>|<BR>|<\/DIV>|<div dir="ltr">|<a href.*|<IMG src.*/ig, '');

        response[i].descriptio = response[i].descriptio.replace(
                /LnAustin/ig, "Ln Austin");

        response[i].descriptio = response[i].descriptio.replace(
                /TerraceAustin/ig, "Terrace Austin");

        response[i].descriptio = response[i].descriptio.replace(
                /Blvd.Austin/ig, "Blvd Austin");

    }
    // ============= Put all of this in a FOR loop =========

    // For loop to push all of the items from the Austin parks API into our database
    for (var i=0; i < response.length; i++){
      var address = response[i].descriptio; 
      var name = response[i].name;
      var loc = {
            lat: response[i].the_geom.coordinates[1],
            lng: response[i].the_geom.coordinates[0]
      };
      dbQuery.ref('parks').push({
        address: address,
        name: name, 
        loc: loc,
      });
    };
});


// Setting up the database


    //     database.ref('Park 01');
    //     database.ref('Park 01').child("address").set(response[0].descriptio);
    //     database.ref('Park 01').child("name").set(response[0].name);
    //     database.ref('Park 01').child("img").set("http://us.123rf.com/450wm/fotoluminate/fotoluminate1605/fotoluminate160500130/57062292-austin-tx-usa--april-14-popular-dog-park-along-auditorium-shores-with-the-downtown-skyline-in-the-ba.jpg?ver=6");
    //     database.ref('Park 01').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 02');
    //     database.ref('Park 02').child("address").set(response[1].descriptio);
    //     database.ref('Park 02').child("name").set(response[1].name);
    //     database.ref('Park 02').child('img').set('https://images.bringfido.com/site_media/photos/2014/08/13/photo__sized.jpg');
    //     database.ref('Park 02').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 03');
    //     database.ref('Park 03').child("address").set(response[2].descriptio);
    //     database.ref('Park 03').child("name").set(response[2].name);
    //     database.ref('Park 03').child('img').set('https://upload.wikimedia.org/wikipedia/commons/8/85/Emma_long_park_shoreline_2014.jpg');
    //     database.ref('Park 03').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 04');
    //     database.ref('Park 04').child("address").set(response[3].descriptio);
    //     database.ref('Park 04').child("name").set(response[3].name);
    //     database.ref('Park 04').child('img').set('https://s3-media4.fl.yelpcdn.com/bphoto/VE2ejjAjaUI7ROVYm43IIg/o.jpg');
    //     database.ref('Park 04').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 05');
    //     database.ref('Park 05').child("address").set(response[4].descriptio);
    //     database.ref('Park 05').child("name").set(response[4].name);
    //     database.ref('Park 05').child('img').set('http://s3-media3.fl.yelpcdn.com/bphoto/-IOcUJUBPpm4pAW9X8zljw/o.jpg');
    //     database.ref('Park 05').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 06');
    //     database.ref('Park 06').child("address").set(response[5].descriptio);
    //     database.ref('Park 06').child("name").set(response[5].name);
    //     database.ref('Park 06').child('img').set('http://www.trippindripp.com/uploads/4/5/5/1/45512863/3211732_orig.jpg');
    //     database.ref('Park 06').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 07');
    //     database.ref('Park 07').child("address").set(response[6].descriptio);
    //     database.ref('Park 07').child("name").set(response[6].name);
    //     database.ref('Park 07').child('img').set('http://48tx1q1rrcysi4t7l687xbtt.wpengine.netdna-cdn.com/wp-content/uploads/2015/08/walnut-creek-new.jpg');
    //     database.ref('Park 07').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 08');
    //     database.ref('Park 08').child("address").set(response[7].descriptio);
    //     database.ref('Park 08').child("name").set(response[7].name);
    //     database.ref('Park 08').child('img').set('https://do512blog.files.wordpress.com/2011/09/dog_friendly_austin.jpg');
    //     database.ref('Park 08').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 09');
    //     database.ref('Park 09').child("address").set(response[8].descriptio);
    //     database.ref('Park 09').child("name").set(response[8].name);
    //     database.ref('Park 09').child('img').set('https://s3-media3.fl.yelpcdn.com/bphoto/z5S6EjDEGdt6uZM677wzZw/o.jpg');
    //     database.ref('Park 09').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 10');
    //     database.ref('Park 10').child("address").set(response[9].descriptio);
    //     database.ref('Park 10').child("name").set(response[9].name);
    //     database.ref('Park 10').child('img').set('http://jciworldcorp.com/traveltourism/austinparks/photos/farwest/IMG_9029.JPG');
    //     database.ref('Park 10').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 11');
    //     database.ref('Park 11').child("address").set(response[10].descriptio);
    //     database.ref('Park 11').child("name").set(response[10].name);
    //     database.ref('Park 11').child('img').set('http://www.mountainbiketx.com/images/photos/trails/mary_searight/mary_searight10-lg.jpg');
    //     database.ref('Park 11').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });

    //     database.ref('Park 12');
    //     database.ref('Park 12').child("address").set(response[11].descriptio);
    //     database.ref('Park 12').child("name").set(response[11].name);
    //     database.ref('Park 12').child('img').set('https://s3-media2.fl.yelpcdn.com/bphoto/RNWJjCm519BDWi5rLngg2Q/o.jpg');
    //     database.ref('Park 12').child("loc").set(
    //             {
    //                 lat: response[0].the_geom.coordinates[1],
    //                 lng: response[0].the_geom.coordinates[0]
    //             });


    // });


// ========= END AUSTIN PARKS API =================