angular.module('observer').
    directive('fieldSelector', [function () {
        return {
            restrict: 'A',
            scope: {
                fields: '=',
                selectedFields: '='
            },
            replace: true,
            templateUrl: 'views/fieldSelector.html',
            controller: ['$scope', function ($scope) {
                $scope.selectedFields = [];

                $scope.fieldFilter = function (field) {
                    if (!$scope.filterText) {
                        return true;
                    }
                    if ($scope.filterText.length === 0) {
                        return true;
                    }
                    return field.toLowerCase().indexOf($scope.filterText.toLowerCase()) >= 0;
                }
                $scope.isSelected = function (field) {
                    var idx = $scope.fields.indexOf(field);
                    return $scope.selectedFields.indexOf(idx) >= 0;
                }

                $scope.selectField = function (field) {
                    var idx = $scope.fields.indexOf(field);
                    if ($scope.isSelected(field)) {
                        $scope.selectedFields = _.without($scope.selectedFields, idx);
                    } else if ($scope.selectedFields.length < 2) {
                        $scope.selectedFields.push($scope.fields.indexOf(field));
                    }
                }
            }]
        };
    }]);