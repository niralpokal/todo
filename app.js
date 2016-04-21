var app = require('express')();
var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();
var url = "mongodb://localhost:27017/test"

app.use(express.static('./public/'))


app.get('/user', function(req, res) {
  var myData ={
    name: 'niral',
    location: 'Newport Beach, Ca'
  }
  res.json(myData);
});

app.post('/list', jsonParser,  function(req, res) {
  var list = req.body
  MongoClient.connect(url, function(err,db){
    if(err){
      throw err;
    }else{
      db.collection('lists').insert([list], function(err, results){
        db.close();
        res.sendStatus(200);
      });
    }
  })
});

app.get('/list/:users', function(req, res) {
  var user = req.params.users
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err;
    }else{
      db.collection('lists').find({'user':user}).toArray(function(err, docs){
        if(err){
          throw err;
        }else{
          db.close();
          res.send(docs[0].list);
        }
      })
    }
  })
});

app.put('/list/:users',jsonParser, function(req, res){
  var item = req.body
  var user = req.params.users
  MongoClient.connect(url, function(err,db){
    if(err){
      throw err;
    }else{
      db.collection('lists').update({'user':user}, {$set:{'list':item}}, function(err, results){
        if(err){
          throw err;
        }else{
          db.close();
          res.sendStatus(200);
        }
      })
    }
  })
})

app.delete('/list/:users', function(req,res){
  var user = req.params.users;
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err
    }else{
      db.collection('lists').remove({'user':user}, function(err, results){
        if (err){
          throw err;
        }else{
          db.close();
          res.sendStatus(200);
        }
      })
    }
  })
});

if(!require.main.loaded){
  var server = app.listen(8080)
}

module.exports = app;
