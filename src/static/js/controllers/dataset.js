angular.module('observer').
    controller('DatasetController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;
        console.log(datasets);
        $scope.selectedFields = {
            firstField: null,
            secondField: null
        }
    }]);