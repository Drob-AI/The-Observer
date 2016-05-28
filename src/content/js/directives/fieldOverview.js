angular.module('observer').
    directive('fieldOverview', [function () {
        return {
            restrict: 'A',
            scope: {
                fields: '=',
                fieldTypes: '=',
                statstics: '=',
            },
            replace: true,
            templateUrl: 'views/fieldOverview.html',
            controller: ['$scope', function ($scope) {
                $scope.isString = function($index) {
                    return $scope.fieldTypes[$index] === 'string';
                }

                $scope.isNumber = function($index) {
                    return $scope.fieldTypes[$index] === 'number';
                }
            }]
        };
    }]);