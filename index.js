'use strict'

import express from 'express';
import handlebars from 'express-handlebars';
import cors from 'cors';
import { Cat } from './models/cat.js';

const app = express();

app.set('port', 3000);
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', cors());

app.engine('handlebars', handlebars({ defaultLayout: 'main.handlebars' }));
app.set('view engine', 'handlebars');

// home route displaying all items in the database
app.get('/', (req, res, next) => {
  Cat.find({})
    .lean()
    .then((cats) => {
      res.render('home', { cats });
    })
    .catch(err => next(err));
});

// about route
app.get('/about', (req, res) => {
  res.render('home', {
    body: `About page - I like cats and have had a few!
      Go to localhost:3000/details followed by ?name= and take a guess!
      Or back to the home page to enter in the search bar.`
  });
});

// detail route displaying item from database matching req.query to database model parameter
app.get('/detail', (req, res, next) => {
  let catName = req.query.name
  Cat.findOne({ name: catName })
    .lean()
    .then((cat) => {
      res.render('details', { result: cat, name: catName });
    })
    .catch(err => next(err));
});

// delete route allowing deletion from database matching req.query to database model parameter
app.get('/delete', (req, res, next) => {
  let catName = req.query.name
  Cat.findOneAndDelete({ name: catName })
    .then((cat) => {
      res.render('delete', { result: cat, name: catName });
    })
    .catch(err => next(err));
});

// API routes
// GET all items from database
app.get('/api/cats', (req, res, next) => {
  Cat.find({})
    .lean()
    .then((cats) => {
      if (!cats) {
        res.json('sorry, no cats found in database')
      } else {
        res.json(cats.map((cat) => {
          return {
            name: cat.name,
            number: cat.number,
            colors: cat.colors,
            fat: cat.fat,
          }
        }))
      }
    })
    .catch(err => next(err));
});

// GET single item from database matching req.params
app.get('/api/cats/:name', (req, res, next) => {
  let catName = req.params.name
  Cat.findOne({ name: catName })
    .lean()
    .then((cat) => {
      if (!cat) {
        res.json('sorry cat: ' + catName + ' was not found in database')
      } else {
        res.json({
          name: cat.name,
          number: cat.number,
          colors: cat.colors,
          fat: cat.fat,
        })
      }
    })
    .catch(err => next(err));
});

// POST

// PUT

// DELETE single item from database matching req.params
app.get('/api/delete/:name', (req, res, next) => {
  let catName = req.params.name
  Cat.findOneAndDelete({ name: catName })
    .then((cat) => {
      if (!cat) {
        res.json('sorry cat: ' + catName + ' was not found in database')
      } else {
        res.json({ 'deleted': cat.name })
      }
    })
    .catch(err => next(err));
});

// 404 error for anything not defined above
app.use((req, res) => {
  res.render('home', {
    body: '404 - Sorry, Not Found.'
  });
});

app.listen(app.get('port'));
