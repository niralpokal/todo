
casper.test.begin('Lets test our Todo App', function(test){
  casper.start('http://localhost:8080',5,  function(){

  }).then(function(){
    test.assertTextExists('Hello', 'The splash screen is displayed');
    this.capture('test1.png')
     this.click('#splash');
  }).then(function(){
    test.assertUrlMatch(/#\/todo/, 'we are at the todo screen')
    this.wait(7000, function(){
      this.capture('test2.png')
      test.assertTextExists('Welcome Home, ', 'we got a welcome message')
    })
  }).then(function(){
    this.wait(3000, function(){
    this.fillSelectors('form[name="new-task"]', {
       'input[name="newtask"]':    'Casper'
   }, false);
    this.click('#addBtn')
    test.assertTextExists('Casper', 'we added a task called Casper')
    this.capture('test3.png')
  })
  }).then(function (){
    this.wait(3000, function(){
    this.click('input[name=Casper]')
    test.assertTextDoesntExist('Casper', 'we removed the task called casper')
    this.capture('test4.png')
  })
  }).run(function(){
    test.done();
  })
})
