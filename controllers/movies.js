// movies.js

module.exports = function (app) {

    const MovieDb = require('moviedb-promise')
    const moviedb = new MovieDb('a83edce1e248c89c1a447f67bc7dcf0b')

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            moviedb.movieTrailers({ id: req.params.id }).then(videos => {
                movie.trailer_youtube_id = videos.youtube[0].source
                console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id)

                res.render('movies-show', { movie: movie });
            }).catch(console.error);
        }).catch(console.error);
    })

}