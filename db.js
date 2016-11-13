var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/';
var collection = 'SearchTerms';

exports.insert = function(term, time){
    mongo.connect(url, function(err, db){
        if(err) throw err;
        
        db.collection(collection)
        .insertOne({'term': term, 'time': time}, function(err, r){
            if(err) throw err;
        });
        
        db.close();
    });
};

exports.find = function(callback){
    mongo.connect(url, function(err, db){
        if(err) throw err;
        
        db.collection(collection).find(function(err, r){
            err ? callback(err, null) : callback(null, r);
        }).limit(10);
    });
};