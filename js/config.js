angular.module('app')
    .config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'views/main.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
            })
            .when('/red', {
                templateUrl : 'red.htm'
            })
            .when('/green', {
                templateUrl : 'green.htm'
            })
            .otherwise('/', {
                redirectTo: '/'
            });
    }]);