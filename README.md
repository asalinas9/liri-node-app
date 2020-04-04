# liri-node-app

# How the app functions:

_Authentication Keys are stored in "keys.js", and its content its exported to the "liri.js" file._

* The program makes a request to the Spotify API where we get a JSON object that includes everything we ask for; artist, song, preview link, and album. 

* The program also makes a request to the OMDb API by using the NPM module, where we also get a JSON object that includes everything we requested; title, year, IMDb rating, languague, among othe detais.

## Below, you will find some screenshots of the node commands of the requests for each section.

#### node liri.js concert-this <artist/band name here> - This will return:
1. Name of the venue
2. Venue location
3. Date of the Event
![](images/concert_this.png)

#### node liri.js spotify-this-song '<song name here>' - This will return:

1. Artist(s)
2. Song Name
3. preview link of the son
4. The album
  4. _If no song is provided the default is "The Sign" by Ace of Base._
![](images/spotify_this.png)

#### node liri.js movie-this '<movie name here>' - This will return:

1. Title.
2. Year of release.
3. IMDB Rating.
4. Rotten Tomatoes Rating.
5. Country where the movie was produced.
6. Language of the movie.
7. Plot of the movie.
8. Actors in the movie.
  _If a movie isn't provided, a default movie, 'Mr. Nobody', will be used._
![](images/movie_this.png)

#### node liri.js do-what-it-says

LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
![](images/do_what_it_says.png)

# Technology Used
1. Node.js
2. Javascript
3. Spotify API (via spotify NPM Module)
4. OMDb API (via request NPM Module)
