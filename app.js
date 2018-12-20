const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" },
    { title: "Move of the Year", movieTitle: "Undercover Brother" },
    { title: "Terrible Movie", movieTitle: "Ninja Assassin" }
  ]
  
  // INDEX
  app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
  })