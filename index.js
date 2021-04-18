'use strict'

import http from 'http';
import { parse } from 'querystring';
import * as myCats from './data.js';

http.createServer((req, res) => {
  let url = req.url.split("?");
  let query = parse(url[1]);
  let path = url[0].toLowerCase();

  switch(path) {
    case '/':
      let cats = myCats.getAll();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Home page - This is the beginning of my app for IT122' + '\n' +
                'Here are my cats: ' + '\n');
      let results = (cats) ? JSON.stringify(cats) : "Where are the cats?.";
      res.write(results);
      res.end();
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page - I like cats and have had a few!' + '\n' +
              'Go to localhost:3000/details followed by ?name= and take a guess!');
      break;
    case '/detail':
      let cat = myCats.getItem(query.name);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let result = (cat) ? JSON.stringify(cat) : "Didn't have that cat.";
      res.end('Cat ' + query.name + ": " + result);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found, 404.');
      break;
  }
}).listen(process.env.PORT || 3000);
