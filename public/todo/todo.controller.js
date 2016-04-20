var app = angular.module('todo')
app.controller('todoController', todo);

app.$inject = ['$http',  'userService'];

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
    console.log(vm.list);
    var update = $http.put('http://localhost:8080/list/Niral', vm.list)
  }
  vm.add = function(item){
    var date1 = new Date();
    date1.setDate((date1.getDate()+7));
    var task = {
      item:item,
      date:date1
    }
    vm.list.push(task);
    console.log(vm.list);
    var update = $http.put('http://localhost:8080/list/Niral', vm.list)
  }
}
