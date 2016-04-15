var app = require('express')();
var express = require('express')

app.use(express.static('./public/'))

app.get('/user', function(req, res) {
  var myData ={
    name: 'Niral',
    location: 'Newport Beach, Ca'
  }
  res.json(myData);
});

app.get('/todos/:users', function(req, res) {
  if(req.params.users === 'Niral'){
    var todos = ['Code', 'Dinner'];
    res.send(todos)
  }else{
    res.sendStatus(404)
  }
});

app.listen(8080);
