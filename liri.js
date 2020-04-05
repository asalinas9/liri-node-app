require('dotenv').config();

var keys = require('./keys.js');
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv[3];

fs.appendFile('log.txt', command + ',', function (err) {
	if (err) throw err;
});

function concertThis(artist) {
	axios
		.get(
			'https://rest.bandsintown.com/artists/' +
				artist +
				'/events?app_id=codingbootcamp'
		)
		.then(function (response) {
			// Saving response into variable
			let concerts = response.data;

			// Using For loop to obtain specific data from bands in town api
			for (let i = 0; i < concerts.length; i++) {
				// Displaying venue info
				console.log('Venue: ' + concerts[i].venue.name);
				console.log('City: ' + concerts[i].venue.city);
				// Using moment.js to convert date of events
				console.log(
					'Event Date: ' + moment(concerts[i].datetime).format('MM/DD/YYYY')
				);
			}
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
}

function spotifyThis(searchTerm) {
	if (searchTerm === 'undefined') {
		searchTerm = 'The Sign, Ace of Base';
	}
	spotify.search({type: 'track', query: searchTerm}, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		} else {
			// if no error
			// For loop is in case a track has multiple artists
			for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
				if (i === 0) {
					console.log('Artist(s):    ' + data.tracks.items[0].artists[i].name);
				} else {
					console.log('              ' + data.tracks.items[0].artists[i].name);
				}
			}
			console.log('Song:         ' + data.tracks.items[0].name);
			console.log('Preview Link: ' + data.tracks.items[0].preview_url);
			console.log('Album:        ' + data.tracks.items[0].album.name);
		}
	});
}

function movieThis(movie) {
	axios
		.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy')
		.then(
			function (response) {
				//console.log(response.data);
				if (response.data.Title != undefined) {
					console.log('Title: ' + response.data.Title);
					console.log('Year: ' + response.data.Year);
					console.log('imdbRating:: ' + response.data.imdbRating);
					console.log('Title: ' + response.data.Title);
					console.log('Country:: ' + response.data.Country);
					console.log('Language:: ' + response.data.Language);
					console.log('Plot: ' + response.data.Plot);
					console.log('Actors: ' + response.data.Actors);
					console.log('RottenTomatoes: ' + response.data.tomatoRating);
				} else {
					movieThis('Mr. Nobody');
				}
			}
			// if response is empty call the api again with the "default" movie
		)
		.catch(function (err) {
			console.log(err);
			console.log('No Results found. ');
		});
}

function doWhatItSays() {
	fs.readFile('random.txt', 'utf8', function (err, data) {
		let dataArray = data.split(',');
		command = dataArray[0];
		searchTerm = dataArray[1];
		spotifyThis(searchTerm);
	});
}

switch (command) {
	case 'concert-this':
		concertThis(searchTerm);
		break;
	case 'spotify-this-song':
		spotifyThis(searchTerm);
		break;
	case 'movie-this':
		movieThis(searchTerm);
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
	default:
}
