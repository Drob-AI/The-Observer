import csv
import json
import sys

class DatasetParser:
    def __init__(self, file_path):
        self.file_data = open(file_path, 'r')

        lines = []
        for line in self.file_data.readlines():
            parsed_row = [ float(field) if field.isdigit() or self._is_float(field) else field
                            for field in line.strip().split(',')]
            lines.append(parsed_row)
        self.file_data = lines

    def _is_float(self, field):
        partition = field.partition('.')
        return (partition[0].isdigit() and partition[1]=='.'
            and partition[2].isdigit() or (partition[0]==''
            and partition[1]=='.' and partition[2].isdigit())
            or (partition[0].isdigit()
            and partition[1]=='.'
            and partition[2]==''))

    def dataset_to_json(self, dataset_info):
        print dataset_info
        del dataset_info['path']
        dataset_info['fields'] = self.file_data[0]
        del self.file_data[0]
        dataset_info['exampleData'] = self.file_data[:5]

        # TODO do it!
        dataset_info['statstics'] = {}

        dataset_info['size'] = {'mb':sys.getsizeof(self.file_data), 'count': len(self.file_data)}
        # TODO do it!
        dataset_info['fill_coef'] = 1
        dataset_info['cluster_data'] = []
        dataset_info['classfier_data'] = []
        dataset_info['regression_data'] = []

        return json.dumps(dataset_info)
