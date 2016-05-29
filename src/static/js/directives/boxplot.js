angular.module('observer').
    directive('boxplot', [function () {
        return {
            restrict: 'A',
            scope: {
                statistic: '=',
                fieldName: '='
            },
            replace: true,
            templateUrl: 'views/boxplot.html',
            controller: ['$scope', function ($scope) {


                    $scope.isBoxPlotDataValid = function(){
                        if(_.isNumber($scope.statistic.max) &&
                        _.isNumber($scope.statistic.q3) &&
                        _.isNumber($scope.statistic.median) &&
                        _.isNumber($scope.statistic.q1) &&
                        _.isNumber($scope.statistic.min)){
                            return true;
                        }
                        return false;
                    };

                    console.log($scope.fieldName);

                    if($scope.isBoxPlotDataValid($scope.statistic)) {


                    $scope.showBoxPlot = true;

                    $scope.boxPlotSettings =
                        {
                        "type":"hboxplot",
                        "background-color":"#032331",
                        "plotarea":{
                            "margin-top":"20%",
                            "margin-left":"25%",
                            "margin-right":"25%"
                        },
                        "plot":{
                            "bar-width":70
                        },
                        "scaleX":{
                                "line-color":"#ffffff",
                                "tick":{
                                    "line-color":"#ffffff"
                                },
                                "guide":{
                                    "line-width":0,
                                    "items":[
                                        {
                                        "background-color":"#ffffff"
                                        },
                                        {
                                        "background-color":"#ffffff"
                                        }
                                    ]
                                },
                                "item":{
                                    "font-size":15,
                                    "font-family": "'Open Sans Condensed', sans-serif"
                                },
                                "max-items":1,
                                "items-overlap":true,
                                "values":[$scope.fieldName]
                            },
                        "scale-y":{
                            "offset-start":20,
                            "offset-end":20,
                            "format":"%v",
                            "line-color":"#ffffff",
                            "tick":{
                                "line-color":"#ffffff"
                            },
                            "guide":{
                                "visible":false,
                                "font-family": "'Open Sans Condensed', sans-serif"
                            }
                        },
                        "options":{
                            "box":{
                                "border-color":"#27566B",
                                "background-color": "#7197A8",
                                "border-width": 2,
                            },
                            "line-median-level":{
                                "line-color":"#467488",
                                "line-width":2
                            },
                            "line-min-level": {
                                "line-color":"#467488",
                                "line-width":2
                            },
                            "line-min-connector":{
                                "line-color":"#27566B",
                                "line-width":2
                            },
                            "line-max-level":{
                                "line-color":"#467488",
                                "line-width":2
                            },
                            "line-max-connector":{
                                "line-color":"#27566B",
                                "line-width":2
                            }
                        },
                        "series":[
                            {
                                "data-box":[
                                    [
                                        $scope.statistic.max,
                                        $scope.statistic.q3,
                                        $scope.statistic.median,
                                        $scope.statistic.q1,
                                        $scope.statistic.min
                                    ]
                                ]
                            }
                        ]
                        }
                    }
                }
            ]
        };
    }]);









