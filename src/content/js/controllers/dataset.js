angular.module('observer').
    controller('DatasetController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;
        $scope.showBoxPlot = false;
        var selectedFeature = 0;

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

    	$scope.boxPlotSettings = 
		    {  
			   "type":"boxplot",
			   "background-color":"#DCE6F1",
			   "title":{  
			      "background-color":"none",
			      "text":"Base Salary Comparison",
			      "color":"black",
			      "font-weight":"none",
			      "font-size":24,
			      "offset-y":"36%"
			   },
			   "plotarea":{  
			      "margin-top":"20%",
			      "margin-left":"25%",
			      "margin-right":"25%"
			   },
			   "plot":{  
			      "bar-width":70
			   },
	           "scaleX":{
		            "line-color":"#0079C4",
		            "tick":{
		                "line-color":"#0079C4"
		            },
		            "guide":{
		                "line-width":0,
		                "items":[
		                    {
		                      "background-color":"#ebebeb"	                        
		                    },
		                    {
		                      "background-color":"#fbfbfb"
		                    }
		                ]
		            },
		            "item":{
		                "font-size":10
		            },
		            "max-items":1,
		            "items-overlap":true,
		            "values":[datasets[8].fields[selectedFeature]]
	        	},
			   "scale-y":{  
			      "offset-start":20,
			      "offset-end":20,
			      "format":"%v",
			      "line-color":"#7F7F7F",
			      "tick":{  
			         "line-color":"#7F7F7F"
			      },
			      "guide":{  
			         "visible":false
			      }
			   },
			   "options":{  
			        "box":{
	                "border-color":"#204A7B",
	                "border-width":2,
	                "tooltip":{
	                    "background-color":"#0079C4",
	                    "shadow":0,
	                    "border-width":2,
	                    "border-color":"#36b574",
	                    "text-align":"left",
	                    "border-radius":"5px",
	                    "text":"<span style=\"font-style:italic;\">%scale-key-text</span><br><b style=\"font-size:15px;\"align:left;>Observations:</b><br><br>Maximum: <b>%data-max</b><br>Upper Quartile: <b>%data-upper-quartile</b><br>Median: <b>%data-median</b><br>Lower Quartile: <b>%data-lower-quartile</b><br>Minimum: <b>%data-min</b>"
	                }
	            },
			      "line-median-level":{  
			         "line-color":"#FC0B1A",
			         "line-width":2
			      },
			      "line-min-level":{  
			         "line-color":"#204A7B",
			         "line-width":2
			      },
			      "line-min-connector":{  
			         "line-color":"#204A7B",
			         "line-width":2
			      },
			      "line-max-level":{  
			         "line-color":"#204A7B",
			         "line-width":2
			      },
			      "line-max-connector":{  
			         "line-color":"#204A7B",
			         "line-width":2
			      }
			   },
			   "series":[  
			      {  
			        "data-box":[  
			            [  
			            	datasets[8].statstics[selectedFeature].max,
			            	datasets[8].statstics[selectedFeature].q3,
			            	datasets[8].statstics[selectedFeature].median,
			            	datasets[8].statstics[selectedFeature].q1,
			            	datasets[8].statstics[selectedFeature].min
			            ]
			        ]
			      }
			   ]
			}

		$scope.isBoxPlotDataValid = function(){
	    	if(_.isNumber(datasets[8].statstics[selectedFeature].max) &&
			   _.isNumber(datasets[8].statstics[selectedFeature].q3) &&
			   _.isNumber(datasets[8].statstics[selectedFeature].median) &&
			   _.isNumber(datasets[8].statstics[selectedFeature].q1) &&
			   _.isNumber(datasets[8].statstics[selectedFeature].min)){
	    		$scope.showBoxPlot = true;
	    	}
    	};
}]);