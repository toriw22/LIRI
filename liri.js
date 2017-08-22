var keys = require("./keys.js");
var request = require("request");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var spotify = new Spotify (keys.spotifyKeys);
var Twitter = require("twitter");
var twitter = new Twitter(keys.twitterKeys);
var fs = require("fs");


inquirer.prompt([
	{
		type: "list",
		name: "command",
		message: "How can I help you?",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
		default: "do-what-it-says"

	}

]).then(function(commands){ 
	if (commands.command == "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function (err, data){ 
			if (err) {
				return console.log(err);
			}
			inquirer.prompt([
			{
				type: "list",
				name: "command",
				message: "How can I help you?",
				choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
				default: data

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
					  		console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
					    	console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
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
					default: "Ace of Base"
				}
				]).then(function(song){ 
					spotify.search({ 
						type: 'track', 
						query: song.songName, 
					}).then(function(data) {
						console.log(song.songName); 
						console.log("Song Name: " + data.tracks.items[0].name);
						console.log("Artist: " + data.tracks.items[0].artists[0].name);
						console.log("Album Title: " + data.tracks.items[0].album.name);
						console.log("URL: " + data.tracks.items[0].artists[0].external_urls.spotify)
					return(song.songName);
					}).catch(function(err) {
		    			console.log(err);
		  			});
				});


			};

			if (commands.command == "my-tweets") {

				twitter.get('statuses/user_timeline', function(error, tweets, response) {
					for (i = 0; i < tweets.length; i++) {
						console.log(tweets[i].created_at + " ==> "+ tweets[i].text);
					}
				   
				});

			};

	
			// var dataArr = data.toString.split(",");
			// console.log(data[0]);
			// commands.command = data[0];
			// song.songName = data[1];
			

			});
		});

	};
	

});
	
