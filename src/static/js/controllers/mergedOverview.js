angular.module('observer').
    controller('MergedOverviewController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = datasets[0]
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
                    var precission = 50 + (Math.random() * 15)

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