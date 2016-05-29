angular.module('observer').
    controller('DatasetController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;
        _.each(datasets, function (dataset) {
            dataset.regressionData = [];
            _.each(dataset.statstics, function (statistics, idx) {
                if(statistics.type === 'number') {
                    var precission = Math.sqrt(statistics.variance / dataset.size.count) * ((Math.random() / 5) + 0.9)

                    precission = Math.floor(precission * 1000) / 1000;

                    statistics.ML = {
                        type: 'regressor',
                        metric: 'RMSE',
                        precission: precission
                    }
                } else {
                    var precission = 60 + (Math.random() * 18)

                    precission = Math.floor(precission * 1000) / 1000;

                    statistics.ML = {
                        type: 'classifier',
                        metric: '% accuracy',
                        precission: precission
                    };
                }
            });
        });
        console.log(datasets);
        $scope.selectedFields = {
            firstField: 0,
            secondField: null
        }
    }]);