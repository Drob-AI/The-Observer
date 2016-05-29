angular.module('observer').
    directive('radar', [function () {
        return {
            restrict: 'A',
            scope: {
                fields: '=',
                statistics: '='
            },
            replace: true,
            templateUrl: 'views/radar.html',
            controller: ['$scope', function ($scope) {
                function render() {
                    radarValues = $scope.statistics.map(
                        function(i){
                            return (i.type == "string" ?
                            i.histogram.length :
                            (i.type == "number" ? (i.std || 0) : 0));
                        });
                    radarDataBand = $scope.fields;

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
                }

                $scope.$watch('statistics', render);
                render();
            }]
        };
    }]);


