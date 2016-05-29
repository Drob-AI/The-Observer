angular.module('observer').
    service('DatasetRepository', ['$q', '$http', function ($q, $http) {
        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor vitae nisl vitae laoreet. Nunc vitae vulputate libero. Fusce magna elit, placerat sed efficitur et, tincidunt ac magna. Phasellus lobortis interdum nisi id molestie. Phasellus mollis mauris  ultrices, aliquet tellus quis, semper nisi. Quisque efficitur tincidunt metus eget efficitur. Suspendisse gravida aliquet odio et convallis. Sed mollis risus vitae massa volutpat pharetra. In nec nibh odio. Quisque purus lorem, accumsan et dapibus eu, aliquet non odio. Nulla id felis elit. Pellentesque in tempus dolor. In vulputate, diam sit amet pellentesque sollicitudin, nulla urna vestibulum urna, sed dictum ligula tellus sit amet erat. Proin id venenatis libero. Suspendisse a consectetur leo.';


        function getAll() {
            return $http({
                method: 'GET',
                url: 'http://localhost:5000/datasets/all'
            }).then(function (datasetsMetadata) {
                return $q.all(_.map(datasetsMetadata.data, function (metadata) {
                    return getById(metadata.id).then(function (dataset) {
                        return dataset.data;
                    });
                }));
            });
        }

        function merged() {
            return $http({
                method: 'GET',
                url: 'http://localhost:5000/datasets/merged/stat?firstId=1&secondId=2&index1=0&index2=0'
            }).then(function (mergedDatasets) {
                return [mergedDatasets.data];
            });
        }


        function getById(id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:5000/dataset?id=' + id
            });
        }

        return {
            all: getAll,
            byId: getById,
            merged: merged
        }
    }]);