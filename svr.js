const open = require('open');

// opens the url in the default browser
open('http://localhost:80/');


const express = require('express');
const app = express();
const port = 80;

app.use(express.static('client'));


app.get('*', function (request, response) {
  response.send('This is not the homepage');
});

app.listen(port, function () {
  console.log('Server is up at ', port);
});


// To start this, either write: node svr.js OR npm start in the terminal
// In URL type  localhost:80
