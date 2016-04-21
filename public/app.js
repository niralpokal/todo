var app = angular.module('todo', ['ngRoute']);

app.filter('upper', function(){
  return function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
})

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when("/todo/", {
    templateUrl: "todo/todo.view.html",
    controller: "todoController",
    controllerAs: "todo"
  })
  .when("/login/", {
    templateUrl: "login/login.view.html",
    controller: "loginController",
    controllerAs: "login"
  })
  .when("/signup/", {
    templateUrl: "signup/signup.view.html",
    controller: "signupController",
    controllerAs: "signup"
  })
}]);
