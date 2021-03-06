var app = angular.module('todo')
app.controller('todoController', todo);

app.$inject = ['$http', 'userService', '$filter', '$location', '$route'];

function todo($http, userService, $filter, $location, $route){
  var vm = this;
  var currentUser = userService.getUser();
  currentUser.then(function(info){
    vm.welcomemessage = "Welcome Home, "
    vm.user = info.data.user
  })
  var todos = $http.get('http://localhost:8080/list/')
  todos.then(function(info){
    vm.list = info.data
    vm.message = ' tasks left'
  })
  vm.complete = function(item){
    var location = vm.list.indexOf(item);
    vm.list.splice(location, 1);
    var update = $http.put('http://localhost:8080/list/', vm.list)
  }
  vm.add = function(item){
    var date1 = new Date();
    date1.setDate((date1.getDate()+7));
    var task = {
      item:item,
      date:date1
    }
    vm.list.push(task);
    var update = $http.put('http://localhost:8080/list/', vm.list)
  }
  vm.logout = function(){
    var update = $http.delete('http://localhost:8080/user')
    update.then(function(){
      $location.path('/login')
      $route.reload();
    })
  }
}
