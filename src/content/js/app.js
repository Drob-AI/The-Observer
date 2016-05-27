angular.module('observer', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/root.html',
            controller: 'RootController'   
        }).otherwise({
            redirectTo: '/'
        });
    });