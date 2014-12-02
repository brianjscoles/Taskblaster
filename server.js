var express = require('express');

var app = express();


app.use(express.static(__dirname +'/assets'));

app.listen(8080);
console.log("server listening on port 8080");

//routes routes routes



