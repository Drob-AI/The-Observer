angular.module('observer').
    controller('DatasetController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;

        $scope.words = [
	      {text: "golem kur", weight: 13},
	      {text: "hoi", weight: 10.5},
	      {text: "Dolor", weight: 9.4},
	      {text: "Sit", weight: 8},
	      {text: "Patka", weight: 6.2},
	      {text: "Consectetur", weight: 5},
	      {text: "Adipiscing", weight: 5},
	      {text: "Elit", weight: 5},
	      {text: "maluk penis", weight: 5},
	      {text: "Leo", weight: 4},
	      {text: "Sapien", weight: 4},
	      {text: "Pellentesque", weight: 3},
	      {text: "habitant", weight: 3},
	      {text: "morbi", weight: 3},
	      {text: "tristisque", weight: 3},
	      {text: "senectus", weight: 3},
	      {text: "et netus", weight: 3},
	      {text: "et malesuada", weight: 3},
	      {text: "fames", weight: 2},
	      {text: "ac turpis", weight: 2},
	      {text: "egestas", weight: 2},
	      {text: "Aenean", weight: 2},
	      {text: "vestibulum", weight: 2},
	      {text: "elit", weight: 2},
	      {text: "sit amet", weight: 2},
	      {text: "metus", weight: 2},
	      {text: "golem kur", weight: 2},
	      {text: "ut ultrices", weight: 2}
    	];
    }]);