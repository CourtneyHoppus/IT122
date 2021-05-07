'use strict'

import express from 'express';
import handlebars from 'express-handlebars';
import { Cat } from './models/cat.js';

const app = express();

app.set('port', 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());
app.use(express.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main.handlebars' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res, next) => {
  Cat.find({}).lean()
    .then((cats) => {
      res.render('home', { cats });
    })
    .catch(err => next(err));
});

app.get('/about', (req, res) => {
  res.render('home', {
    body: `About page - I like cats and have had a few!
      Go to localhost:3000/details followed by ?name= and take a guess!
      Or back to the home page to enter in the search bar.`
  });
});

app.get('/detail', (req, res, next) => {
  let catName = req.query.name
  Cat.findOne({ name:{ $regex: catName, $options: 'i' }})
    .lean()
    .then((cat) => {
      res.render('details', { result:cat, name:catName });
    })
    .catch(err => next(err));
});

app.get('/delete', (req, res, next) => {
  let catName = req.query.name
  Cat.findOneAndDelete({ name:{ $regex: catName, $options: 'i' }})
    .then((cat) => {
      res.render('delete', { result:cat, name:catName });
    })
    .catch(err => next(err));
});

app.use((req, res) => {
  res.render('home', {
    body: '404 - Sorry, Not Found.'
  });
});

app.listen(app.get('port'));
