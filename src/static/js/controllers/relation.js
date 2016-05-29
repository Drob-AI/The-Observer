angular.module('observer').
    controller('RelationController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;
        console.log(datasets);
    }]);