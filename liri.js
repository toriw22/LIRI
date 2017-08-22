var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var spotifyKeys = require("./spotifykeys.js");
var spotify = new Spotify (spotifyKeys);
var Twitter = require("twitter");
var client = new Twitter(keys);


inquirer.prompt([
	{
		type: "list",
		name: "command",
		message: "How can I help you?",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
		default: "do-what-it-says"

	}

]).then(function(commands){ 

	if (commands.command == "movie-this") {

		inquirer.prompt([
		{
			type: "input",
			name: "movieName",
			message: "Which movie would you like to look up?",
			default: "Mr+Nobody"
		}
		]).then(function(movie){ 

			request("http://www.omdbapi.com/?t=" + movie.movieName + "&apikey=40e9cece", function(error, response, body) {
			  	if (!error && response.statusCode === 200) {
			  		console.log("Movie Title: " + JSON.parse(body).Title);
			  		console.log("Year: " + JSON.parse(body).Year);
			  		console.log(JSON.parse(body).Ratings[0]);
			    	console.log(JSON.parse(body).Ratings[1]);
			    	console.log("Country: " + JSON.parse(body).Country);
			    	console.log("Language: " + JSON.parse(body).Language);
			    	console.log("Plot: " + JSON.parse(body).Plot);
			    	console.log("Actors: " + JSON.parse(body).Actors);

		  		};
			});
		
		});

	};
	if (commands.command == "spotify-this-song") {
		inquirer.prompt([
		{
			type: "input",
			name: "songName",
			message: "Which song would you like to look up?",
			default: "The Sign"
		}
		]).then(function(song){ 
			spotify.search({ 
				type: 'track', 
				query: song.songName, 
			}).then(function(data) {
				console.log(song.songName); 
				console.log(data);
			}).catch(function(err) {
    			console.log(err);
  			});
		});


	};

	if (commands.command == "my-tweets") {

		client.get('favorites/list', function(error, tweets, response) {
		  console.log(tweets);  // The favorites. 
		  console.log(response);  // Raw response object. 
});

	};

	// if (commands.command == "do-what-it-says") {


	// };

});
	
