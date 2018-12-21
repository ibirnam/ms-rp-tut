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

// Require the models and controllers
const Review = require('./models/review');
const reviews = require('./controllers/reviews')(app, Review);

// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Move of the Year", movieTitle: "Undercover Brother" },
//     { title: "Terrible Movie", movieTitle: "Ninja Assassin" }
//   ]
  
