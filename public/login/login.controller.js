app.controller('loginController', login);

app.$inject = ['$http', '$location', '$scope'];

function login($http, $location, $scope){
  var vm = this;
  $scope.go= function(path){
    $location.path(path)
  }
  vm.login = function(info, path){
    var update = $http.post('http://localhost:8080/user', info)
    update.then(function(data){
      $scope.go(path)
    })
  }
}
