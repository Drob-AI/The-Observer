angular.module('observer').
    directive('datasetSelector', [function () {
        return {
            restrict: 'A',
            scope: {
                selected: '=dataset',
                datasets: '='
            },
            replace: true,
            templateUrl: 'views/datasetSelector.html',
            controller: ['$scope', function ($scope) {
                $scope.expanded = false;

                $scope.selectDataset = function (dataset) {
                    $scope.selected = dataset;
                    $scope.expanded = false;
                }

                $scope.toggleMenu = function () {
                    $scope.expanded = !$scope.expanded;
                }

                $scope.glyphMenuClass = function () {
                    var expanded = $scope.expanded;

                    return {
                        'glyphicon-menu-up': expanded,
                        'glyphicon-menu-down': !expanded
                    };
                }
            }]
        };
    }]);