var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var spotify = new Spotify (keys.spotifyKeys);
var Twitter = require("twitter");
var twitter = new Twitter(keys.twitterKeys);
var fs = require("fs");
var command = process.argv[2] || "do-what-it-says";
var input = process.argv[3];
var input = (command == "spotify-this-song") ? "the sign" : process.argv[3];

if (command == "spotify-this-song") {
	input = input || "the sign";

}

if (command == "movie-this") {
	input = input || "mr+nobody";

}


function myTweets() {
	twitter.get('statuses/user_timeline', function(error, tweets, response) {
			for (i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at + " ==> "+ tweets[i].text);
			}
		   
		});

};

function spotifyThisSong(input){
	spotify.search({ 
		type: 'track', 
		query: input, 
	}).then(function(data) {
		console.log(input); 
		console.log("Song Name: " + data.tracks.items[0].name);
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Album Title: " + data.tracks.items[0].album.name);
		console.log("URL: " + data.tracks.items[0].artists[0].external_urls.spotify)
	return(input);
	}).catch(function(err) {
		console.log(err);
		});

};

function movieThis(input){
	request("http://www.omdbapi.com/?t=" + input + "&apikey=40e9cece", function(error, response, body) {
	  	if (!error && response.statusCode === 200) {
	  		console.log("Movie Title: " + JSON.parse(body).Title);
	  		console.log("Year: " + JSON.parse(body).Year);
	  		console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
	    	console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
	    	console.log("Country: " + JSON.parse(body).Country);
	    	console.log("Language: " + JSON.parse(body).Language);
	    	console.log("Plot: " + JSON.parse(body).Plot);
	    	console.log("Actors: " + JSON.parse(body).Actors);

  		};
	});

};

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function (err, data){ 
		if (err) {
			return console.log(err);
		}
		var dataArr = data.split(",");
		var newCommand = dataArr[0];
		var newRequest = dataArr[1];
		program(newCommand, newRequest);
	});

};


function program (command, input) {
	switch (command) {
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThisSong(input);
			break;
		case "movie-this":
			movieThis(input);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("error");

	};

}

program(command, input);
