angular.module('observer').
    directive('compare', ['$http', function ($http) {
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

                $scope.mainValues = [[]];
                $scope.auxValues = [[]];

                $scope.mainFieldIndex = function (field) {
                    return $scope.mainDataset.fields.indexOf(field);
                }

                $scope.auxFieldIndex = function (field) {
                    return $scope.auxDataset.fields.indexOf(field);
                }

                $scope.isMainString = function (value, idx) {
                    return $scope.mainValues[idx];
                };

                $scope.isAuxString = function (value, idx) {
                    return $scope.auxValues[idx];
                };

                function reasonableSizes(values) {
                    return _.map(values, function(value) {
                        if (value.length === 0) {
                            return null;
                        }
                        if (_.every(value, function (val) {
                            return val === null;
                        })) {
                            return null
                        }
                        if (_.every(value, function (val) {
                            return val === "";
                        })) {
                            return null
                        }
                        if (value.length < 100) {
                            return _.sortBy(value, function (a) {
                                return a;
                            });
                        }
                        return null;
                    });
                }

                function getValues() {
                    var mainId = $scope.mainDataset.id,
                        auxId = $scope.auxDataset.id;

                    $http({
                        method: 'GET',
                        url: 'http://localhost:5000/datasets/values?firstId=' + mainId + '&secondId=' + auxId
                    }).then(function (response) {
                        var data = response.data;
                        $scope.mainValues = reasonableSizes(data.first);
                        $scope.auxValues = reasonableSizes(data.second);

                        console.log($scope.mainValues);
                    });
                }

                $scope.$watch('mainDataset', function () {
                    $scope.primaryKey = null;
                    $scope.remoteKey = null;
                    $scope.bindings = [];
                    $scope.mainValues = [[]];
                    $scope.auxValues = [[]];

                    if ($scope.mainDataset && $scope.auxDataset) {
                        getValues();
                    }
                })

                $scope.$watch('auxDataset', function () {
                    $scope.primaryKey = null;
                    $scope.remoteKey = null;
                    $scope.bindings = [];
                    $scope.mainValues = [[]];
                    $scope.auxValues = [[]];

                    if ($scope.mainDataset && $scope.auxDataset) {
                        getValues();
                    }
                })

                $scope.$watch('mainValues', function () {
                    $scope.bindings = [];
                })

                $scope.$watch('auxValues', function () {
                    $scope.bindings = [];
                })

                // var values = [
                //     ['Eins', 'Zwei', 'Drei', 'Vier']
                //     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                //     ['A', 'B', 'C', 'D', 'E', 'F']
                // ]

                // $scope.$watch('mainDataset', function (newValue) {
                //     if (newValue) {
                //         $scope.mainDataset.values = values;
                //     }
                // });

                // $scope.$watch('auxDataset', function (newValue) {
                //     if (newValue) {
                //         $scope.auxDataset.values = values;
                //     }
                // });

                $scope.showStepTwo = function () {
                    return $scope.primaryKey !== null &&
                        $scope.remoteKey !== null;
                }

                $scope.bindings = [];
            }]
        };
    }]);