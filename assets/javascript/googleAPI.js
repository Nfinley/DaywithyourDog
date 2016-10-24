// ========Initialize Firebase=========

var config = {
    apiKey: "AIzaSyAv-6bOhqHPkkst-Aw7ULPb-xvTqHqTpeo",
    authDomain: "bars-backup.firebaseapp.com",
    databaseURL: "https://bars-backup.firebaseio.com",
    storageBucket: "bars-backup.appspot.com",
    messagingSenderId: "149078553518"
};
firebase.initializeApp(config);

var dbQuery = firebase.database();

var cardId = [];

var imgURL = [];

getData();

function getData() {

	//change ref per depending if it's bars or restaurants
	var query = dbQuery.ref('restaurants');

	query.once("value")
        .then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				cardId.push(childSnapshot.val().id);
			});
		});
    console.log(cardId);
}


// ======== 1st GOOGLE API AJAX FUNCTION===========
//====== Draft - by Nigel ==========
// googlePlacesPull();
// var petStores = [];

var placeId = [];

var photoReference = [];

function googlePlacesPull() {
	// Add the GOOGLE QUERY SEARCH url 
	// Starting with Pet Store search
	//var searchParam = "pet_store"; 
	// var searchParam = "veterinary_care";
	// This current search will only yeild 19 results. Use the next_page_token to get more results
	//for (i=0; i < 5; i++){
		//bars - 40
        var queryURL= "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.2672,-97.7431&radius=50000&keyword=" + cardId[40] + "&key=AIzaSyAnP96C4pRrqEGJA-GxmQYr2pJaFb9lYfU"

		// Ajax call that pulls the data from the api
		$.ajax({
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type':'application/x-www-form-urlencoded'
				},
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
		// Logs entire response
		console.log("This is the GOOGLE place response: " + JSON.stringify(response));

		//Sets the variable results = the entire data set coming from the API
		var data = response.results[0];

		console.log(data);
		console.log(data.photos[0].photo_reference);

		var imgURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + data.photos[0].photo_reference + "&key=AIzaSyAnP96C4pRrqEGJA-GxmQYr2pJaFb9lYfU";

		console.log("IMG URL:" + imgURL);

		dbQuery.ref('restaurants').child(cardId[39]).child('image').set(imgURL);

		})
		.error(function(error) {
	       	console.log(error);
		 });
	//}
}

//old key: AIzaSyBBH_dVCGulO-Q4XVW2VVGPhjv-Q5J8i5E
// // ===== 2ND function that pulls the data from the first petStores search and populates more detailed data =====

  // function googleImages() {
  //     // API DATA

  //     // Add the GOOGLE QUERY SEARCH url 
  //       // Starting with Pet Store search details 
  //       // ChIJM89u8izKRIYRQ1idTtNkf9o  test place id for an
  //   //for (var k=0; k < placeId.length; k++){
  //       var queryURL= "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBcwAAAPbx8odJieaXxHqHVcxvooDEkwD6ZSiUDBvXQp7GH9P9xtRdSIGEwLSWctteD_uinrKaBfbRubM9pC0qJWCZWmxjr-bG2TXo5gsXmx5INLM9hLFwC9DEfaccDyBhz4ND5_86ZtH2WXlHe32mVnpkUpAHpJsJ8ZzDsOqoVPm4YPihEhDTsBCypL_ovuJT9tGO3u5RGhTIj4wND1nSZZT0VOrWTOxxAFe8PQ&key=AIzaSyBBH_dVCGulO-Q4XVW2VVGPhjv-Q5J8i5E"


  //       // Ajax call that pulls the data from the api
  //       $.ajax({
  //               headers: {
  //                 'Access-Control-Allow-Origin': '*',
  //                 'content-type': 'text/plain'
  //               },
  //               // async: false,
  //               url: queryURL,
  //               method: 'GET'
  //       })
  //       .done(function(data, status, request){
  //       	console.log(request.getResponseHeader('location'));
  //       console.log('done');

  //       database.ref('bars').child(cardId[k]).child('image').set(image);
  //       // add here the push to database!!!!

  //           // Create this as a function outside of the ajax call
  //       })
  //       .error(function(error) {
  //       	console.log(error);
  //       });
  //   //}
  // }

// function placeDetails(response){
//  // Logs entire response
//               // console.log("This is the 2nd GOOGLE place response: " + JSON.stringify(response));

//               //Sets the variable results = the entire data set coming from the API
//               var dataSetTwo = response.result; 

//               console.log(dataSetTwo);

//               // Create a for loop to loop through the results then pull out the various tags that we need
//               // for (var i=0; i < petStores.length; i++){
//                 var address = dataSetTwo[i].formatted_address;
//                 var phone = dataSetTwo[i].formatted_phone_number;
//                 var icon = dataSetTwo[i].icon;
//                 var website = dataSetTwo[i].website;


//                 // Store this in an objec and pushes it to the empty array called petStores
//                 petStores.push({address: address, phone: phone, icon: icon, website: website});
//                 // push these objects to an array which will then be pushed to the firebase database


// }



// Empties the cards view  before adding a new buttons
// $('#cardsAppearHere').empty();

// NOT USING THE UNDERSCORE LIBRARY
// Loops through array and prints out all items to the screen
//          for (var i = 0; i < results.length; i++) {

//           // creates the materialize 'card'
// var starDiv = $('<div class="col s12 m4 l3"><div class="card"><div class="card-image"><img src="'+ results[i].images.fixed_height_small_still.url + '" data-still="'+ results[i].images.fixed_height_small_still.url+ '" data-animate="'+ results[i].images.fixed_height_small.url +'" data-state="still"></div><div class="card-content"><p class="rate"> Rating: '  + results[i].rating + '</p></div></div></div>');
//              // Writes the card to the page
//              $('#gifsAppearHere').prepend(starDiv);

// }

// using Underscore.js and template the image changes. 
// var $gifs = $('#gifsAppearHere');
// // Targeting the underscore template housed in the html
// var $giphyTemplate = _.template($('#giphyTmpl').html());
// // for each loop similar to that used in Star wars game
// results.forEach(function(result) {
//       $gifs.prepend($giphyTemplate({result: result }));
//   });
