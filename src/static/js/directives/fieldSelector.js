angular.module('observer').
    directive('fieldSelector', [function () {
        return {
            restrict: 'A',
            scope: {
                fields: '=',
                selectedFields: '=',
            },
            replace: true,
            templateUrl: 'views/fieldSelector.html',
            controller: ['$scope', function ($scope) {
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
                    return $scope.selectedFields.firstField === idx || $scope.selectedFields.secondField === idx;
                }

                $scope.selectField = function (field) {
                    var idx = $scope.fields.indexOf(field);
                    if ($scope.isSelected(field)) {
                        if ($scope.selectedFields.firstField === idx) {
                            $scope.selectedFields.firstField = $scope.selectedFields.secondField;
                            $scope.selectedFields.secondField = null;
                        } else if ($scope.selectedFields.secondField === idx) {
                            $scope.selectedFields.secondField = null;
                        }
                    } else if (!_.isNumber($scope.selectedFields.firstField)) {
                        $scope.selectedFields.firstField = idx;
                    } else if (!_.isNumber($scope.selectedFields.secondField)) {
                        $scope.selectedFields.secondField = idx;
                    }
                }
            }]
        };
    }]);