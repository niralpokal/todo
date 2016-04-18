var request = require('request');
var chai = require('chai');
var assert = chai.assert
var app = require('./app.js')
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

describe('Check List', function(){
  it('create a new list', function(done){
    request({
      method: 'POST',
      url: 'http://localhost:' + port+ '/list',
      json:{user:'Tom',list:[{item:"Code"},{item:"Work out"},{item:'Sleep'}]}
    }, function(err, response, body){
      if(!err && response.statusCode==200){
        done();
      }else if(err){
        throw(err);
      }
    })
  })
  it('checking the list', function(done){
    request.get('http://localhost:' + port+ '/list/Tom', function(err, response, body){
      if (!err && response.statusCode ==200) {
      assert.isAtLeast(body.length, 1, 'we found something');
        done();
      }
    })
  })
  it('updating a list', function(done){
    request({
      method: 'PUT',
      url: 'http://localhost:'+ port+ '/list/Tom',
      json:[{item:"Code"},{item:"Work out"}]
    }, function(err,response,body){
      if(!err && response.statusCode ==200){
        done();
      }
    })
  })
  it('delete the list', function(done){
    request.del('http://localhost:' + port+ '/list/Tom', function(err,response,body){
      if(err){
        throw err;
      }else if(!err && response.statusCode ==200){
        done();
      }
    })
  })
})
