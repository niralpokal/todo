var app = angular.module('todo')

app.directive('logout', logout);

function logout(){
  return {
    templateUrl: 'todo/logout.directive.html'
  }
}
