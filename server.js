var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname, '');

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));

app.listen(8080);
console.log("Happy hacking!\n");  
console.log("http://localhost:8080\n");  
console.log("Angularjs tutorial Server is Listening on port 8080");  