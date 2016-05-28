angular.module('observer').
    controller('DatasetController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;
        $scope.selectedFields = {
            firstField: null,
            secondField: null
        }
    }]);