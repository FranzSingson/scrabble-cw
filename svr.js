// import express from 'express';

// const app = express();
// app.use(express.static('client'));
// app.listen(8080);


// C:\Users\sings\Documents\GitRepo

// node 'c:\Users\sings\Documents\\server-practice\node_modules\http-server\bin\http-server' -p80

// node 'C:\Users\sings\Documents\GitRepo\scrabble-cw\client\node_modules\http-server\bin\http-server' -p40





// const http = require ('http');

// const server = http.createServer(function(req, res){

//     res.setHeader("Content-type", "application/json")
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.writeHead(200); //Status code HTTP 200 / OK


//     let dataObj = {"id": 123, "name":"Bob", "email": "bobwork.org"};
//     let data = JSON.stringify(dataObj);
//     res.end(data);
// });

// server.listen(1234, function() {
//     console.log('listen on port 1234');
// })

// https //localhost:1234/



const express = require("express");
const path = require("path");
const app = express();

// app.get('/', function(request, response) {
//     response.sendFile(path.join(__dirname, './client', 'index.html'));
// });
app.use(express.static('client'));

// sendFile(path)

app.get('*', function(request, response){
    response.send('This is not the homepage');
});

app.listen(80, function(){
    console.log("Server is up at 80")
});

// To start this, either write: node svr.js OR npm start in the terminal
// In URL type  localhost:80