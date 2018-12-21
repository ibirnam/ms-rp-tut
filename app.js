const express = require('express')
const methodOverride = require('method-override')

const app = express()

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
});

// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Move of the Year", movieTitle: "Undercover Brother" },
//     { title: "Terrible Movie", movieTitle: "Ninja Assassin" }
//   ]
  
// INDEX
app.get('/', (req, res) => {
Review.find()
    .then(reviews => {
    res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
    console.log(err);
    })
})

// NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review);
      res.redirect(`/reviews/${review._id}`); // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message);
    })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      res.render('reviews-show', { review: review })
    }).catch((err) => {
      console.log(err.message);
    })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review});
    })
  })

  // UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })