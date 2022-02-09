const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static('public'));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname + '/views/partials'));
// ...

// Add the route handlers here:

//Solution corrected
app.all('/', (req, res) => {
  res.render('index');
});

//To get all beers
app.all('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(responseFromDB => {
      console.log('Response is:', responseFromDB);

      res.render('allBeers', { beers: responseFromDB });
    })
    .catch(error => console.log(error));
});

//Random beers
app.all('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromDB => {
      console.log('Response is:', responseFromDB);

      const randomBeer = responseFromDB[0];
      console.log('the beer:', randomBeer);

      res.render('random-beer', randomBeer);
    })
    .catch(error => console.log(error));
});

//Old solution
// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/beers', (req,res) => {
//   punkAPI.getBeers()
//   .then(beersFromApi => res.render('beers',{
//     doctitle: 'Beers', beersFromApi}))

app.listen(3000, () => console.log('🏃‍ on port 3000'));
