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
        
        db.collection(collection)
        .find({}, {_id: 0}, {limit : 10}).sort({_id: -1}).toArray(function(err, r){
            if(err) callback(err,null);
            else if(r) callback(null, r);
        });
        
        db.close();
    });
};