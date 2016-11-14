var express = require("express");
var app = express();
var url = require("url");
var db = require("./db");
var request = require("request");
var api = require("./api_key");


var API_URL = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search';
var API_IMG_COUNT = 10;


app.get('/api/imagesearch/:query', function(req, res){
    var query = req.params.query;
    var offset = req.query.offset;
    
    db.insert(query, new Date().toUTCString());
    
    var options = {
      url: API_URL,
      headers: {
        'Ocp-Apim-Subscription-Key': api.API_KEY
      },
      qs: {
        q: query,
        offset: offset,
        count: API_IMG_COUNT,
        
      }
    };
    
    request(options, callback);
    
    function callback(error, response, body){
      var results = [];
      if(!error && response.statusCode == 200){
        var imgs = JSON.parse(body);
        for (var i in imgs.value) {
          results.push({url: imgs.value[i].contentUrl, snippet: imgs.value[i].name, thumbnail: imgs.value[i].thumbnailUrl, context: imgs.value[i].hostPageDisplayUrl});
        }
        
        res.json(results);
      }
    };
    
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
  console.log(api.API_KEY);
});