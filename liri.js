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

function concertThis() {
	if (typeof searchTerm === 'undefined') {
		console.log('You need to provide an artist to do a search...');
		return;
	}
	axios
		.get(
			'https://rest.bandsintown.com/artists/' +
				searchTerm +
				'/events?app_id=codingbootcamp'
		)
		.then(function (response) {
			// console.log(response.data[0]);
			if (response.data[0] != undefined) {
				console.log('---------------------');
				console.log(`Venue Name:  ${response.data[0].venue.name}`);
				console.log(`Venue Location:  ${response.data[0].venue.city}`);
				console.log(
					`Date of Event:  ${moment(response.data[0].datetime).format(
						'MM/DD/YYYY'
					)}`
				);
				console.log('---------------------');
			} else {
				console.log('No events found...');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function spotifyThis() {
	if (typeof searchTerm === 'undefined') {
		searchTerm = 'The Sign, Ace of Base';
	}
	spotify.search({type: 'track', query: searchTerm, limit: 1}, function (
		err,
		data
	) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		// console.log(data);
		console.log('-----------------------');
		console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
		console.log(`Track name: ${data.tracks.items[0].name}`);
		if (data.tracks.items[0].preview_url === null) {
			console.log('No preview available...');
		} else {
			console.log(`Preview URL: ${data.tracks.items[0].preview_url}`);
		}
		console.log(`Album: ${data.tracks.items[0].album.name}`);
		console.log('-----------------------');
	});
}
function movieThis(movie) {
	axios
		.get(
			'http://www.omdbapi.com/?t=' +
				movie +
				'&y=&plot=short&tomatoes=true&apikey=trilogy'
		)
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
		.catch(function (error) {
			console.log(error);
			console.log('No Results found. ');
		});
}

function doWhatItSays() {
	fs.readFile('random.txt', 'utf8', function (err, data) {
		let dataArray = data.split(',');
		command = dataArray[0];
		searchTerm = dataArray[1];
		spotifyThis(dataArray);
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
