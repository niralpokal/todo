var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http){
  var vm = this
  var user = $http.get('http://localhost:8080/user');
  user.then(function(info){
    vm.message = "Welcome Home, "
    vm.user = info.data
  })
}

app.directive('greeting', greeting);

function greeting(){
  return{
    templateUrl:'home/greeting.directive.html'
  }
}

app.controller('todoController', todo);

app.$inject = ['$http'];
app.$inject = ['$scope'];

function todo($http, $scope){
  var vm = this;
  var todos = $http.get('http://localhost:8080/list/Niral')
  todos.then(function(info){
    $scope.list = info.data
  })
}
