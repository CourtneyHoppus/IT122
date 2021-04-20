'use strict'

import * as myCats from './data.js';

import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

app.set('port', 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main.handlebars' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {
    cats: myCats.getAll()
  });
});

app.get('/about', (req, res) => {
  res.render('home', {
    body: `About page - I like cats and have had a few!
      Go to localhost:3000/details followed by ?name= and take a guess!
      Or back to the home page to enter in the search bar.`
  });
});

app.get('/detail', (req, res) => {
  let cat = myCats.getItem(req.query.name);
  res.render('details', {
    name: req.query.name,
    result: cat
  });
});

app.use((req, res) => {
  res.render('home', {
    body: '404 - Sorry, Not Found.'
  });
});

app.listen(app.get('port'));
