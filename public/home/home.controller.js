app.controller('homeController', home);

app.$inject = ['$http', 'userService'];

function home($http, userService){
  var vm = this
  var user = userService.getUser()
  user.then(function(info){
    vm.message = "Welcome Home, "
    vm.user = info.data
  })
}
