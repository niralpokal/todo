var app = require('express')();
var express = require('express');
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();
var ObjectID = require('mongodb').ObjectID
var url = "mongodb://test:test@ds013881.mlab.com:13881/todotest"

app.use(express.static('./public/'))
app.use(cookieParser());

app.post('/user', jsonParser, function(req, res){
  var list = req.body
  MongoClient.connect(url, function(err,db){
    if(err){
      throw err;
    }else{
      db.collection('lists').find(list).toArray(function(err, docs){
        if(err){
          throw err;
        }else{
          db.close();
          console.log(docs[0]);
          res.cookie('id', docs[0]._id);
          res.sendStatus(200);
        }
      })
    }
  })
})
app.get('/user', function(req, res) {
  var user = {
    _id:ObjectID(req.cookies.id)
  }
  MongoClient.connect(url, function(err,db){
    if(err){
      throw err;
    }else{
      db.collection('lists').find(user).toArray(function(err, docs){
        if(err){
          throw err;
        }else{
          db.close();
          res.send(docs[0]);
        }
      })
    }
  })
});

app.post('/list', jsonParser,  function(req, res) {
  var list = req.body
  MongoClient.connect(url, function(err,db){
    if(err){
      throw err;
    }else{
      db.collection('lists').insert([list], function(err, results){
        db.close();
        var x = results.ops[0]._id
        res.cookie('id', x);
        res.sendStatus(200);
      });
    }
  })
});

app.get('/list', function(req, res) {
  var user = {
    _id:ObjectID(req.cookies.id)
  }
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err;
    }else{
      db.collection('lists').find(user).toArray(function(err, docs){
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

app.put('/list',jsonParser, function(req, res){
  var item = req.body
  var user = {
    _id:ObjectID(req.cookies.id)
  }
  MongoClient.connect(url, function(err,db){
    if(err){
      throw err;
    }else{
      db.collection('lists').update(user, {$set:{'list':item}}, function(err, results){
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

app.delete('/list', function(req,res){
  var user = {
    _id:ObjectID(req.cookies.id)
  }
  MongoClient.connect(url, function(err, db){
    if(err){
      throw err
    }else{
      db.collection('lists').remove(user, function(err, results){
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
