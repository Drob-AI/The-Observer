import csv
import json
import sys
import numpy as np
import numbers
from scipy import stats
class DatasetParser:
    def __init__(self, file_path):
        self.file_data = open(file_path, 'r')

        lines = []
        for line in self.file_data.readlines():
            parsed_row =  self._parse_row(line.strip().split(','))
            lines.append(parsed_row)

        self.file_data = lines

    def _parse_row(self, row):

        result = [ float(field) if isinstance(field, numbers.Number) or field.isdigit() or self._is_float(field) else field
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
        stats = {}
        if(is_float):
            stats = {'type': 'number', 'min': np.nanmin(feature), 'max': np.nanmax(feature),
                      'q1':np.nanpercentile(feature, 25), 'q3':np.nanpercentile(feature, 75),
                      'median':np.nanmedian(feature), 'mean': np.nanmean(feature),
                      'variance': np.nanvar(feature), 'std': np.nanstd(feature),
                      'avr': np.average(feature)}
        else:
            counted = {}
            for nominal in feature:
                nominal
                if nominal in counted:
                    counted[nominal] += 1
                else:
                    counted[nominal] = 1

            counted = [{'text':key, 'weight':counted[key]} for key in counted]
            stats = {'type':'string', 'histogram': counted}

        return stats

    def _calculate_statistics(self):
        result = []
        transposed = np.array(self.file_data).T

        for field in transposed:
            field = self._parse_row(field)
            result.append(self._calculate_feature_stats(field))

        return result


    # def _is_float(self, field):
    #     if(not(not field) and field[0] == '-'):
    #         field = field[1:]

    #     # TODO please forgive me!
    #     field = str.replace(field , 'e-', '')
    #     field = str.replace(field , 'E-', '')
    #     partition = field.partition('.')

    #     return (partition[0].isdigit() and partition[1]=='.'
    #         and partition[2].isdigit() or (partition[0]==''
    #         and partition[1]=='.' and partition[2].isdigit())
    #         or (partition[0].isdigit()
    #         and partition[1]=='.'
    #         and partition[2]==''))

    def _is_float(self, field):
        try:
          float(field)
          return True
        except Exception:
            return False

    def _clear_info(self, dataset_info):
        for field_stats in dataset_info['statstics']:
            for key in field_stats:
                if(key != 'type' and isinstance(field_stats[key], numbers.Number)and np.isnan(field_stats[key])):
                    field_stats[key] = None

        if(hasattr(dataset_info['cov_matrix'], '__iter__')):
            for field_stats in dataset_info['cov_matrix']:
                for index, x in enumerate(field_stats):
                    if(np.isnan(x)):
                        field_stats[index] = None
        else:
            dataset_info['cov_matrix'] = None


        if(hasattr(dataset_info['static_test'], '__iter__')):
            for index, field_stats in enumerate(dataset_info['static_test']):
                    if(np.isnan(field_stats[0])):
                        dataset_info['static_test'][index] = list(field_stats)
                        dataset_info['static_test'][index][0] = None
        else:
            dataset_info['static_test'] = None

        return dataset_info

    def dataset_to_json(self, dataset_info):
        del dataset_info['path']
        dataset_info['fields'] = self.file_data[0]
        del self.file_data[0]
        dataset_info['exampleData'] = list(self.file_data[:5])

        dataset_info['statstics'] = self._calculate_statistics()

        dataset_info['size'] = {'mb':sys.getsizeof(self.file_data), 'count': len(self.file_data)}
        dataset_info['fillCoef'] = self._calculate_fill_coef()

        # TODO do it!
        dataset_info['clusterData'] = []
        dataset_info['classfierData'] = []
        dataset_info['regressionData'] = []

        transposed = [self._parse_row(field) for field in np.array(self.file_data).T]
        # print(transposed)
        all_number_sets = filter(lambda feature: all([isinstance(x, numbers.Number) for x in feature]), transposed)

        number_rows_stats = filter(lambda x: x['type'] == 'number', dataset_info['statstics'])


        result = []
        for index, column in enumerate(all_number_sets):
            result.append([])
            for x in column:
                if np.isnan(x):
                    result[-1].append(number_rows_stats[index]['avr'])
                else:
                    result[-1].append(x)

        dataset_info['cov_matrix'] = np.corrcoef(all_number_sets).tolist()

        dataset_info['static_test'] = []
        for numberset in all_number_sets:
            for numberset2 in all_number_sets:
                dataset_info['static_test'].append(stats.pearsonr(numberset, numberset2))
        return json.dumps(self._clear_info(dataset_info))
