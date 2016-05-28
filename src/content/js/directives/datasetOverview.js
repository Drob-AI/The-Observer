angular.module('observer').
    directive('datasetOverview', [function () {
        return {
            restrict: 'A',
            scope: {
                dataset: '='
            },
            replace: true,
            templateUrl: 'views/datasetOverview.html',
        };
    }]);