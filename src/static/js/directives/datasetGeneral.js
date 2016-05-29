angular.module('observer').
    directive('datasetGeneral', [function () {
        return {
            restrict: 'A',
            scope: {
                dataset: '='
            },
            replace: true,
            templateUrl: 'views/datasetGeneral.html'
        };
    }]);