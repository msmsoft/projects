(function () {
    'use strict';
    angular
        .module('app')
        .controller('mainCtrl',  mainCtrl);
        function mainCtrl($scope, dataService) {
            var vm = this;
            vm.title = {
                name: 'Mikhail Malakhvei Front-End UI Developer (MEAN)',
            };
            vm.navigation = dataService.navigation;
            vm.navActive = function(index) {
                for (var i in vm.navigation) {
                    vm.navigation[i].active = false;
                }
                vm.navigation[index].active = true;
            };
            vm.navActive(0);
        };
})();