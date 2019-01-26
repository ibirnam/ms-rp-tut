// movies.js

module.exports = function (app) {

    const MovieDb = require('moviedb-promise')
    const moviedb = new MovieDb('a83edce1e248c89c1a447f67bc7dcf0b')

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })

}