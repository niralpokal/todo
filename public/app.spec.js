var webPage = require('webpage');
var page = webPage.create();


page.onConsoleMessage = function(msg){
  console.log(msg);
}

page.open("http://localhost:8080/", function(){
  page.includeJs("https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min.js", function (){
      page.evaluate(function(){
        document.getElementById('splash').click();
      })
      setTimeout(function(){
        page.render('test.png');
        phantom.exit();
      }, 5000)
    })


})
