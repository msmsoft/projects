(function () {
  'use strict';
  angular
    .module('app')
    .controller('navCtrl',  navCtrl);
  function navCtrl($scope, dataService) {
    var vm = this;
    vm.navigation = dataService.navigation;
  };
})();