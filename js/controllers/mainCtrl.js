(function () {
    'use strict';
    angular
        .module('app')
        .controller('mainCtrl',  mainCtrl);
        function mainCtrl($scope) {
            var vm = this;
            vm.title = {
                name: 'Mikhail Malakhvei Front-End UI Developer (MEAN)',
            };
            vm.navigation = [{
               name: 'Resume',
               link: '/'
            },{
                name: 'Components',
                link: '/components'
            },{
                name: 'T-Shirt',
                link: '/t-shirt'
            },{
                name: 'Refference',
                link: '/refs'
            }];
        };
})();