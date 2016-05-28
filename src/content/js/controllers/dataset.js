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

    	fieldnames = ['a1', 'a2', 'a3', 'a4', 'a5']
    	coefs = [
    		[1.0, 0.15, 0.35, 0.55, 0.75],
    		[0.8, 0.15, 0.35, 0.55, 0.75],
    		[0.6, 0.15, 0.35, 0.55, 0.75],
    		[0.4, 0.15, 0.35, 0.55, 0.75],
    		[0.2, 0.15, 0.35, 0.55, 0.75]
    	]

    	$scope.heatmapJson = {
            "type":"piano",
            "title":{
                "y":"15px",
                "x":"-10px",
                "text":"Correlation coefficients",
                "background-color":"none",
                "font-family": 'Open Sans Condensed',
                "font-color":"#05636c",
                "font-size":"24px",
                "height":"25px"
            },
            "backgroundColor":"#fff",
            "plotarea":{
                "margin":"100 60 90 60"
            },
            "scaleX":{
                "zooming":true,
                "placement":"opposite",
                "lineWidth":0,
                "item":{
                    "border-color":"none",
                    "size":"13px",
                	"font-family": 'Open Sans Condensed',
                    "font-color":"#05636c"
                },
                "guide":{
                    "visible":false
                },
                "tick":{
                    "visible":false
                },
                "values":fieldnames
            },
            "scaleY":{
                "zooming":true,
                "lineWidth":0,
                "mirrored":true,
                "tick":{
                    "visible":false
                },
                "guide":{
                    "visible":false
                },
                "item":{
                    "border-color":"none",
                    "size":"13px",
                	"font-family": 'Open Sans Condensed',
                    "font-color":"#05636c"
                },
                "values":fieldnames
            },
            /*"legend":{
                "layout":"x6",
                "y":"83.5%",
                "x":"15%",
                "width":"80%",
                "shadow":false,
                "border-width":0,
                "toggle-action":"none",
                "item":{
                    "border-color":"none",
                    "size":"13px",
                    "font-color":"#05636c"
                },
                "marker":{
                    "type":"square",
                    "border-radius":"8",
                    "border-color":"none",
                    "size":"13px"
                },
                "footer":{
                    "border-color":"none",
                    "background-color":"none",
                    "text-align":"center",
                    "font-size":"14px",
                    "font-color":"#05636c"
                }
            },*/
            "zoom":{
              "background-color":"#ccccff",
              "border-width":5,
              "border-color":"#3399ff",
              "alpha":0.3
            },
            "plot":{
                "aspect":"none",
                "borderWidth":2,
                "borderColor":"#eeeeee",
                "borderRadius":7,
                "rules":[
                    {
                        "rule":"%node-value > 0.8",
                        "backgroundColor":"#9E2619",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 0.6 && %node-value <= 0.8",
                        "backgroundColor":"#9E6719",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 0.4 && %node-value <= 0.6",
                        "backgroundColor":"#9E8819",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 0.2 && %node-value <= 0.4",
                        "backgroundColor":"#137729",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 0 && %node-value <= 0.2",
                        "backgroundColor":"#183A68",
                        "font-color":"#05636c"
                    }
                ]
            },
            "series":coefs.map(function(i) { return {"values":i}; })
        };
    }]);