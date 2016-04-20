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
