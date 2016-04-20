var app = angular.module('todo')
app.controller('todoController', todo);

app.$inject = ['$http'];

function todo($http){
  var vm = this;
  var todos = $http.get('http://localhost:8080/list/Niral')
  todos.then(function(info){
    vm.list = info.data
    vm.message = ' tasks left'
  })
  vm.complete = function(item){
    var location = vm.list.indexOf(item);
    vm.list.splice(location, 1);
    var update = $http.put('http://localhost:8080/list/Niral', vm.list)
  }
  vm.add = function(item){
    var task = {
      item:item
    }
    vm.list.push(task);
    var update = $http.put('http://localhost:8080/list/Niral', vm.list)
  }
}
