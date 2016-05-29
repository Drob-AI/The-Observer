angular.module('observer').
    controller('DatasetController', ['$scope', 'datasets', function ($scope, datasets) {
        $scope.dataset = null;
        $scope.datasets = datasets;
        $scope.showBoxPlot = false;
        var selectedFeature = 2;

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


    	fieldnames = datasets[8].fields;
    	coefs = datasets[8].cov_matrix;

    	radarValues = datasets[8].statstics.map(
    		function(i){
    			return (i.type == "string" ?
    			i.histogram.length :
    			(i.type == "number" ? (i.std || 0) : 0));
    		});
    	radarDataBand = datasets[8].fields;

    	$scope.radarJson = {
		  "globals": {
		    "font-family":'Open Sans Condensed',
		    "shadow":false
		  },
			"type" : "radar",
			"background-color":"#FFF",
			"plot":{
			  "aspect":"rose",
			  "animation": {
			    "effect":"ANIMATION_EXPAND_TOP",
		      "sequence":"ANIMATION_BY_PLOT_AND_NODE",
		      "speed":30
			  }
			},
			"title" : {
			  "text" : "Standard Deviation of attributes",
			  "background-color":"#333",
			  "font-size":"24px"
			},
			"scale-k":{
		    "aspect":"circle",
		    "visible":false
		  },
		  "scale-v":{
		    "values":"0:25:5",
		    "guide": {
		      "line-width":1,
		      "line-style":"solid",
		      "line-color":"#333"
		    },
		    "item": {
		      "color":"#333"
		    },
		    "line-color":"#FFF"
		  },
		  "tooltip": {
		    "text":"%v st.dev. for %data-band",
		    "background-color":"#CFF",
		    "color":"#333",
		    "font-size":"14px"
		  },
			"series" : [
				{
					"values" : radarValues,
					"data-band" : radarDataBand,
					//"tooltip-text" : "%v studio albums made by %data-band",
					"url" : "http://www.google.com/#q=%data-band",
					"target" : "_blank",
					"background-color":"#0CF"
				}
			]
		};

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
                }//,
                //"values":fieldnames
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
                }//,
                //"values":fieldnames
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
                        "rule":"%node-value > 0.5 && %node-value <= 0.8",
                        "backgroundColor":"#9E6719",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 0.2 && %node-value <= 0.5",
                        "backgroundColor":"#9E8819",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > -0.5 && %node-value <= 0.2",
                        "backgroundColor":"#137729",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > -1.0 && %node-value <= -0.5",
                        "backgroundColor":"#183A68",
                        "font-color":"#05636c"
                    }
                ]
            },
            "series":coefs.map(function(i) { return {"values":i.map(function(j){return j || 0})}; })
        };
}]);
