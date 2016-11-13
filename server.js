var express = require("express");
var app = express();
var url = require("url");
var db = require("./db");

app.get('/api/imagesearch/:query', function(req, res){
    var query = req.params.query;
    var offset = req.query.offset;
    
    db.insert(query, new Date().toUTCString());
    res.end();
    
});

app.get('/api/lastest/imagesearch/', function(req, res){
    db.find(callback);
    
    function callback(err, r){
      if(err) res.status(400).send('Error retreiving data from DB');
      res.json(r);
      
    };
});


app.listen(8080, function () {
  console.log('Running on 8080');
});