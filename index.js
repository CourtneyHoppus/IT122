const http = require("http");

http.createServer((req, res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Home page - This is the beginning of my app for IT122');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page - I have some experience with Node but wanted to solidify it. ' +
              'I needed an elective, and I find the structure and accountabilty' +
              ' of taking a class is what I need to learn and not just self-teaching.');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
  }
}).listen(process.env.PORT || 3000);
