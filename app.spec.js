var request = require('request');
var chai = require('chai');
var assert = chai.assert
var app = require('./app.js')
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;
var request = request.defaults({jar:true});

describe('Check List', function(){
  it('create a new user', function(done){
    request({
      method: 'POST',
      url: 'http://localhost:' + port+ '/list',
      json:{user:'Tom', pass:'tom', list:[{item:"Code"},{item:"Work out"},{item:'Sleep'}]}
    }, function(err, response, body){
      if(!err && response.statusCode==200){
        done();
      }else if(err){
        throw(err);
      }
    })
  })
  it('check if you can login', function(done){
    this.timeout(3000)
    request({
      method: 'POST',
      url: 'http://localhost:' + port+ '/user',
      json:{user:'Tom',pass:'tom'}
    }, function(err, response, body){
      if(!err && response.statusCode==200){
        done();
      }else if(err){
        throw(err);
      }
    })
  })
  it('checking the list', function(done){
    this.timeout(3000)
    request.get('http://localhost:' + port+ '/list/', function(err, response, body){
      if (!err && response.statusCode ==200) {
      assert.isAtLeast(body.length, 1, 'we found something');
        done();
      }else if(err){
        throw(err);
      }
    })
  })
  it('updating the list', function(done){
    request({
      method: 'PUT',
      url: 'http://localhost:'+ port+ '/list/',
      json:[{item:"Code"},{item:"Work out"}]
    }, function(err,response,body){
      if(!err && response.statusCode ==200){
        done();
      }else if(err){
        throw(err);
      }
    })
  })
  it('delete the list', function(done){
    request.del('http://localhost:' + port+ '/list/', function(err,response,body){
      if(err){
        throw err;
      }else if(!err && response.statusCode ==200){
        done();
      }
    })
  })
})
