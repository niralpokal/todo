var app = angular.module('todo');

app.directive('greeting', greeting);

function greeting(){
  return{
    templateUrl:'todo/greeting.directive.html'
  }
}
