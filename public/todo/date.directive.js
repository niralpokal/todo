var app = angular.module('todo')

app.directive('date', date);

function date(){
  return {
    templateUrl: 'todo/date.directive.html'
  }
}
