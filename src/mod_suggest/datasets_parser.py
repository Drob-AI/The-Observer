import csv
import json
import sys
import numpy as np
import numbers

class DatasetParser:
    def __init__(self, file_path):
        self.file_data = open(file_path, 'r')

        lines = []
        for line in self.file_data.readlines():
            parsed_row =  self._parse_row(line.strip().split(','))
            lines.append(parsed_row)

        self.file_data = lines

    def _parse_row(self, row):
        result = [ float(field) if field.isdigit() or self._is_float(field) else field
                            for field in row]

        return [np.nan if (not field) or field == 'nan' else field for field in result]

    def _calculate_fill_coef(self):
        not_filled = 0;
        all = 0;
        for row in self.file_data:
            empty_data = filter(lambda field: not field, row)
            not_filled = not_filled + len(empty_data)
            all = all + len(row)

        return float(not_filled) / float(all)

    def _calculate_feature_stats(self, feature):
        is_float = all([isinstance(x, numbers.Number) for x in feature])
        # print(is_float, feature)
        stats = {}
        if(is_float):
            stats = {'min': np.nanmin(feature), 'max': np.nanmax(feature),
                      'q1':np.nanpercentile(feature, 25), 'q3':np.nanpercentile(feature, 75),
                      'median':np.nanmedian(feature), 'mean': np.nanmean(feature),
                      'variance': np.nanvar(feature), 'std': np.nanstd(feature)}

        return stats

    def _calculate_statistics(self):
        result = []
        transposed = np.array(self.file_data).T
        for field in transposed:
            field = self._parse_row(field)
            result.append(self._calculate_feature_stats(field))

        return result


    def _is_float(self, field):
        if(not(not field) and field[0] == '-'):
            field = field[1:]

        partition = field.partition('.')
        return (partition[0].isdigit() and partition[1]=='.'
            and partition[2].isdigit() or (partition[0]==''
            and partition[1]=='.' and partition[2].isdigit())
            or (partition[0].isdigit()
            and partition[1]=='.'
            and partition[2]==''))

    def dataset_to_json(self, dataset_info):
        del dataset_info['path']
        dataset_info['fields'] = self.file_data[0]
        del self.file_data[0]
        dataset_info['exampleData'] = self.file_data[:5]

        # TODO do it!
        dataset_info['statstics'] = self._calculate_statistics()

        dataset_info['size'] = {'mb':sys.getsizeof(self.file_data), 'count': len(self.file_data)}
        # TODO do it!
        dataset_info['fillCoef'] = self._calculate_fill_coef()
        dataset_info['clusterData'] = []
        dataset_info['classfierData'] = []
        dataset_info['regressionData'] = []

        transposed = [self._parse_row(field) for field in np.array(self.file_data).T]

        all_number_sets = filter(lambda feature: all([isinstance(x, numbers.Number) for x in feature]), transposed)
        dataset_info['cov_matrix'] = np.corrcoef(all_number_sets).tolist()
        return json.dumps(dataset_info)
