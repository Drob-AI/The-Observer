angular.module('observer', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/root.html',
            controller: 'RootController'
        }).when('/datasets', {
            templateUrl: '/views/root.html',
            controller: 'RootController'
        }).when('/models', {
            templateUrl: '/views/root.html',
            controller: 'RootController'
        }).when('/relation', {
            templateUrl: '/views/root.html',
            controller: 'RootController'
        }).otherwise({
            redirectTo: '/'
        });
    });