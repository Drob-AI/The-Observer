angular.module('observer').
    directive('compare', [function () {
        return {
            restrict: 'A',
            scope: {
                mainDataset: '=',
                auxDataset: '='
            },
            replace: true,
            templateUrl: 'views/compare.html',
            controller: ['$scope', function ($scope) {
                $scope.primaryKey = null;
                $scope.remoteKey = null;

                $scope.isMainString = function (value, idx) {
                    return $scope.mainDataset.statstics[idx].type === 'string';
                };

                $scope.isAuxString = function (value, idx) {
                    return $scope.auxDataset.statstics[idx].type === 'string';
                };

                $scope.$watch('mainDataset', function () {
                    $scope.primaryKey = null;
                    $scope.remoteKey = null;
                    $scope.bindings = [];
                })

                $scope.$watch('auxDataset', function () {
                    $scope.primaryKey = null;
                    $scope.remoteKey = null;
                    $scope.bindings = [];
                })

                var values = [
                    ['Eins', 'Zwei', 'Drei', 'Vier']
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    ['A', 'B', 'C', 'D', 'E', 'F']
                ]

                $scope.$watch('mainDataset', function (newValue) {
                    if (newValue) {
                        $scope.mainDataset.values = values;
                    }
                });

                $scope.showStepTwo = function () {
                    return $scope.primaryKey !== null &&
                        $scope.remoteKey !== null;
                }

                $scope.$watch('auxDataset', function (newValue) {
                    if (newValue) {
                        $scope.auxDataset.values = values;
                    }
                });

                $scope.bindings = [];
            }]
        };
    }]);