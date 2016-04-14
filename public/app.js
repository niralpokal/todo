var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http){
  var user = $http.get('http://localhost:8080/user');
  user.then(function(info){
    vm.message = info.data.name
  })
  var vm = this
}


app.controller('todoController', todo);

app.$inject = ['$http'];

function todo($http){
  var vm = this;
  var todos = $http.get('http://localhost:8080/todos/Niral')
  todos.then(function(info){
    vm.todo = info.data
  })
}
