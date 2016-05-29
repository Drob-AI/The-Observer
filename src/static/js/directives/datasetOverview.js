angular.module('observer').
    directive('datasetOverview', [function () {
        return {
            restrict: 'A',
            scope: {
                dataset: '=',
                merged: '='
            },
            replace: true,
            templateUrl: 'views/datasetOverview.html',
            controller: ['$scope', function ($scope) {
                $scope.rand = function () {
                    return Math.floor(Math.random() * 10000);
                }
            }]
        };
    }]);