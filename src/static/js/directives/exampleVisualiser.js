angular.module('observer').
    directive('exampleVisualiser', [function () {
        return {
            restrict: 'A',
            scope: {
                fields: '=',
                examples: '='
            },
            replace: true,
            templateUrl: 'views/exampleVisualiser.html',
            controller: ['$scope', function ($scope) {
                $scope.max = Math.max
            }]
        };
    }]);