// scripts.js

if (document.getElementById('new-comment')) {
    // listen for a form submit event
    document.getElementById('new-comment').addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();

        // serialize the form data into an object
        let comment = {};
        const inputs = document.getElementsByClassName('form-control');
        for (var i = 0; i < inputs.length; i++) {
            comment[inputs[i].name] = inputs[i].value;
        }

        // use axios to initialize a post request and send in the form data
        console.log(comment);
        const movieId = comment.movieId;
        axios.post(`/movies/${comment.movieId}/reviews/${comment.reviewId}/comments`, comment)
            .then(function (response) {
                // wait for the success response from the server
                console.log("response: ", response);

                // remove the information from the form
                document.getElementById('new-comment').reset();

                console.log('movieId: ', movieId);
                // display the data as a new comment on the page
                document.getElementById('comments').insertAdjacentHTML('afterbegin',
                    `<div class="card">
                            <div class="card-block">
                                <h4 class="card-title">${response.data.comment.title}</h4>
                                <p class="card-text">${response.data.comment.content}</p>
                                <p>
                                    <form method="POST" action="/movies/${movieId}/reviews/${response.data.comment.reviewId}/comments/${response.data.comment._id}?_method=DELETE">
                                        <button class="btn btn-link" type="submit">Delete</button>
                                    </form>
                                </p>
                            </div>
                        </div>`
                );
            })
    });
}