angular.module('observer').
    controller('MainController', ['$scope', '$location', function ($scope, $location) {
        $scope.isSelected = function (pathName) {
            return $location.path().indexOf(pathName) === 1;
        }
    }]);