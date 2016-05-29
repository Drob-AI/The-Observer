angular.module('observer').
    directive('heatmap', [function () {
        return {
            restrict: 'A',
            scope: {
                dataset: '='
            },
            replace: true,
            templateUrl: 'views/heatmap.html',
            controller: ['$scope', function ($scope) {
                function render() {
                    fieldnames = $scope.dataset.fields;
                    coefs = $scope.dataset.cov_matrix;

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
                }
                $scope.$watch('dataset', render);
                render();
            }]
        };
    }]);