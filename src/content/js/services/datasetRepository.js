angular.module('observer').
    service('DatasetRepository', ['$q', function ($q) {
        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor vitae nisl vitae laoreet. Nunc vitae vulputate libero. Fusce magna elit, placerat sed efficitur et, tincidunt ac magna. Phasellus lobortis interdum nisi id molestie. Phasellus mollis mauris  ultrices, aliquet tellus quis, semper nisi. Quisque efficitur tincidunt metus eget efficitur. Suspendisse gravida aliquet odio et convallis. Sed mollis risus vitae massa volutpat pharetra. In nec nibh odio. Quisque purus lorem, accumsan et dapibus eu, aliquet non odio. Nulla id felis elit. Pellentesque in tempus dolor. In vulputate, diam sit amet pellentesque sollicitudin, nulla urna vestibulum urna, sed dictum ligula tellus sit amet erat. Proin id venenatis libero. Suspendisse a consectetur leo.';

        var datasetExamples = [
            [1463396525947, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1463483238948, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1463569649537, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1463656058893, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1463742510697, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1463828968247, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1463915381861, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1464001808971, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1464088219263, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1464174634308, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1464261046554, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
            [1464347453828, 'John Smith', 'ISIS on UFO sightings', text, 'war on terror'],
        ]

        var datasets = [
            {
                id: 0,
                name: 'Weather Data',
                personal: true,
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 1,
                name: 'KGB secret documents',
                userSubmitted: true,
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 2,
                name: '9/11 Reports',
                userSubmitted: true,
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 3,
                name: 'UFO Sightings',
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 4,
                name: 'Weather Data',
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 5,
                name: 'KGB secret documents',
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 6,
                name: '9/11 Reports',
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            },
            {
                id: 7,
                name: 'UFO Sightings',
                description: text,
                fields: ['Date', 'Author', 'Title', 'Content', 'Category', 'ViewCount', 'Tags'],
                fieldTypes: ['DateTime', 'String', 'String', 'Text', 'String', 'Number', 'String'],
                data: datasetExamples
            }
        ];

        function getAll() {
            return $q.when(datasets);
        }

        function getById(id) {
            return $q.when(_.pluck(datasets, {id: id}));
        }

        return {
            all: getAll,
            byId: getById
        }
    }]);