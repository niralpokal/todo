app.controller('homeController', home);

app.$inject = ['userService', '$filter'];

function home(userService, $filter){
  var vm = this
  var user = userService.getUser()
  user.then(function(info){
    vm.message = "Welcome Home, "
    vm.user = info.data.user
  })
}
