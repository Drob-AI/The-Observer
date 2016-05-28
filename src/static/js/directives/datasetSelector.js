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
                $scope.personalFilter = function (dataset) {
                    return dataset.personal;
                }

                $scope.userFilter = function (dataset) {
                    return dataset.userSubmitted;
                }

                $scope.public = function (dataset) {
                    return !dataset.personal && !dataset.userSubmitted;
                }

                $scope.filterBy = function (filter) {
                    $scope.datasetFilter = filter;
                }

                $scope.datasetFilter = $scope.personalFilter;

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