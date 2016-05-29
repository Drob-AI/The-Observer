angular.module('observer', ['ngRoute', 'angular-jqcloud', 'ngResource', 'zingchart-angularjs']).
    config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/views/root.html',
            controller: 'RootController'
        }).when('/datasets', {
            templateUrl: '/views/dataset.html',
            controller: 'DatasetController',
            resolve: {
                datasets: ['DatasetRepository', function (DatasetRepository){
                    return DatasetRepository.all();
                }]
            }
        }).when('/dataset/merged', {
            templateUrl: '/views/mergedOverview.html',
            controller: 'MergedOverviewController',
            resolve: {
                datasets: ['DatasetRepository', '$location', function (DatasetRepository, $location){
                    return DatasetRepository.merged($location.search().key);
                }]
            }
        }).when('/models', {
            templateUrl: '/views/model.html',
            controller: 'ModelController'
        }).when('/relations', {
            templateUrl: '/views/relation.html',
            controller: 'RelationController',
            resolve: {
                datasets: ['DatasetRepository', function (DatasetRepository){
                    return DatasetRepository.all();
                }]
            }
        }).otherwise({
            redirectTo: '/'
        });
    });