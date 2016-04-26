
casper.test.begin('Lets test our Todo App', function(test){
  casper.start('http://localhost:8080',5,  function(){

  }).then(function(){
    test.assertTextExists('Hello', 'The splash screen is displayed');
    this.capture('test1.png')
     this.click('#login');
  }).then(function(){
    test.assertUrlMatch(/#\/login/, 'we are at the login screen')
    this.wait(5000, function(){
      this.fillSelectors('form[name="loginForm"]', {
         'input[name="name"]':    'niral',
         'input[name="password"]':    'niral'
     }, false);
     this.capture('test2.png')
     this.click('#loginBtn')
     this.capture('test3.png')
    })
  }).then(function(){
    this.wait(5000, function(){
    test.assertUrlMatch(/#\/todo/, 'we are at the todo screen')
    test.assertTextExists('Welcome Home, ', 'we got a welcome message')
    this.fillSelectors('form[name="new-task"]', {
       'input[name="newtask"]':    'Casper'
   }, false);
    this.click('#addBtn')
    this.wait(500, function(){
      test.assertTextExists('Casper', 'we added a task called Casper')
      this.capture('test3.png')
    })
  })
  }).then(function (){
    this.wait(2000, function(){
    this.click('input[name=Casper]')
    test.assertTextDoesntExist('Casper', 'we removed the task called casper')
    this.capture('test4.png')
  })
}).then(function(){
  this.click('#logout');
  this.wait(1000, function(){
    test.assertUrlMatch(/#\/login/, 'we logged out')
  })
}).run(function(){
    test.done();
  })
})
