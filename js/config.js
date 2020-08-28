angular.module('app')
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'views/main.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    })
    .when('/components', {
      templateUrl : 'views/components.html',
      controller: 'componentsCtrl',
      controllerAs: 'main'
    })
    .when('/t-shirt', {
      templateUrl : 'views/t-shirt.html',
      controller: 'shirtCtrl'
    })
    .otherwise('/', {
      redirectTo: '/'
    });
}]);