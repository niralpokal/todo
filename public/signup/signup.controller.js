app.controller('signupController', signup);

app.$inject = ['$http', '$location', '$scope'];

function signup($http, $location, $scope){
  var vm = this;
  $scope.go = function(path){
    $location.path(path)
  }
  vm.signup = function(info, path){
    info.list = []
   var update = $http.post('http://localhost:8080/list', info)
   update.then(function(){
     $scope.go(path)
   })
 }
}
