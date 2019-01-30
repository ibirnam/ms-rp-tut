// comments.js
const Comment = require('../models/comment');
module.exports = (app) => {

    // CREATE Comment
    app.post('/movies/:movieid/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body).then((comment) => {
            // console.log(comment)
            // res.redirect(`/movies/${req.body.movieId}/reviews/${comment.reviewId}`);
            res.status(200).send({ comment: comment });
        }).catch((err) => {
            // console.log(err.message);
            res.status(400).send({ err: err })
        });
    });

    // DELETE
    app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
}