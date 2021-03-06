import datetime
import os
import src.mod_suggest.datasets_parser as parsers
import src.mod_suggest.tree_trainer as TreeTrainer
import time
import json
# Import the database object from the main app module
from src import DB, FLASK

from src.mod_suggest.models import Dataset

from flask import request
from flask import make_response

import numpy as np
import urllib

@FLASK.route('/')
def root():
    return FLASK.send_static_file('index.html')

@FLASK.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return FLASK.send_static_file(path)

@FLASK.route('/download')
def download():

    id = request.args.get('gid')
    dataset = Dataset.query.get(id)
    uploads = os.path.realpath(dataset.path)
    csv = open(uploads, 'r').read()
    response = make_response(csv)
    # This is the key: Set the right header for the response
    # to be downloaded, instead of just printed on the browser
    response.headers["Content-Disposition"] = "attachment; filename=" + dataset.name
    return response

@FLASK.route('/classifier/download')
def download_clf():

    id = request.args.get('gid')
    index = int(request.args.get('index'))
    dataset = Dataset.query.get(id)
    path = os.path.realpath('src/mod_suggest/datasets/my_model.pkl')

    data_interface = parsers.DatasetParser( os.path.realpath(dataset.path))
    data_interface.calculate_stats()

    # print(data_interface.rows_for_classifiers())
    print('=============Tree====================')
    TreeTrainer.train_classifier_tree(data_interface.rows_for_classifiers(), index, data_interface.stats)
    TreeTrainer.train_classifier_tree2(data_interface.rows_for_classifiers(), index, data_interface.stats)
    print('=============KNN====================')
    TreeTrainer.train_knn(data_interface.rows_for_classifiers(), index, data_interface.stats)
    TreeTrainer.train_knn2(data_interface.rows_for_classifiers(), index, data_interface.stats)
    print('=============SVM====================')
    TreeTrainer.train_classifier_svm(data_interface.rows_for_classifiers(), index, data_interface.stats)
    TreeTrainer.train_classifier_svm2(data_interface.rows_for_classifiers(), index, data_interface.stats)

    csv = open(path, 'r').read()
    response = make_response(csv)


    response.headers["Content-Disposition"] = "attachment; filename=" + dataset.name
    # return response
    return 'success'

@FLASK.route("/delete-datasets")
def delete_dataset_info():
    Dataset.query.delete()
    DB.session.commit()
    return "Deleted"

@FLASK.route("/create-datasets")
def create_dataset_info():
    models = [
        Dataset('Daily Weather Observations',
            'Observations from Canberra Airport.',
            'Observations were drawn from Canberra Airport(station 070351)',
            'src/mod_suggest/datasets/dummy.csv',
            time.time(),
            False,
            True),
        Dataset('Gene/Protein Function and Localization',
                'The genomes of several organisms have now been completely sequenced, including the human genome depending on one\'s definition of "completely" :-). Interest within bioinformatics is therefore shifting somewhat away from sequencing, to learning about the genes encoded in the sequence. Genes code for proteins, and these proteins tend to localize in various parts of cells and interact with one another, in order to perform crucial functions. The present data set consists of a variety of details about the various genes of one particular type of organism. Gene names have been anonymized and a subset of the genes have been withheld for testing',
                 'Observations were drawn from Canberra Airport(station 070351)',
                 'src/mod_suggest/datasets/interaction_relations.csv', time.time(),
                 False,
                 True),
        Dataset('International Comparison Program ',
                'The genomes of several organisms have now been completely sequenced, including the human genome depending on one\'s definition of "completely" :-). Interest within bioinformatics is therefore shifting somewhat away from sequencing, to learning about the genes encoded in the sequence. Genes code for proteins, and these proteins tend to localize in various parts of cells and interact with one another, in order to perform crucial functions. The present data set consists of a variety of details about the various genes of one particular type of organism. Gene names have been anonymized and a subset of the genes have been withheld for testing',
                 'Data are sourced from the World Bank, International Comparison Program database. One dataset is provided: PPP conversion factor, GDP (LCU per international $)',
                 'src/mod_suggest/datasets/ppp_countries.csv', time.time(),
                 True,
                 False),

        Dataset('GP practices in England.',
            'Demographic and location data for all GP practices in England.',
            'Data sources published by Health and Social Care Information Centre. Licensed under Open Government Licence.',
            'src/mod_suggest/datasets/GP_Practice-info-England.csv',
            time.time(),
            False,
            False),
        Dataset('Auto-Mpg Data',
            'Demographic and location data for all GP practices in England.',
            'This dataset is a slightly modified version of the dataset provided in the StatLib library.  In line with the use by Ross Quinlan (1993) in predicting the attribute "mpg", 8 of the original instances were removed because they had unknown values for the "mpg" attribute. ',
            'src/mod_suggest/datasets/auto-mgp.csv',
            time.time(),
            False,
            True),
        Dataset('Bike Sharing Dataset',
            'This dataset contains the hourly and daily count of rental bikes between years 2011 and 2012 in Capital bikeshare system with the corresponding weather and seasonal information.',
            'Laboratory of Artificial Intelligence and Decision Support (LIAAD), University of Porto',
            'src/mod_suggest/datasets/bike-sharing.csv',
            time.time(),
            False,
            True),
        Dataset('Wine Data Set',
            'Using chemical analysis determine the origin of wines',
            'Institute of Pharmaceutical and Food Analysis and Technologies, Via Brigata Salerno',
            'src/mod_suggest/datasets/winequality-white.csv',
            time.time(),
            False,
            True),
        Dataset('Forest Fires Data Set',
            'This is a difficult regression task, where the aim is to predict the burned area of forest fires, in the northeast region of Portugal, by using meteorological and other data',
            'Department of Information Systems, University of Minho, Portugal.',
            'src/mod_suggest/datasets/forestfires.csv',
            time.time(),
            False,
            True),
         Dataset('Student Performance Data Set',
            'Predict student performance in secondary education (high school).',
            'Paulo Cortez, University of Minho, Guimares, Portugal',
            'src/mod_suggest/datasets/student-performance.csv',
            time.time(),
            False,
            True),
    ]

    DB.session.add_all(models)
    DB.session.commit()
    return json.dumps([dataset.to_dict() for dataset in Dataset.query.all()])

@FLASK.route("/dataset")
def find_dataset_info():
    id = request.args.get('id')
    dataset = Dataset.query.get(id)

    data_interface = parsers.DatasetParser( os.path.realpath(dataset.path))
    return data_interface.dataset_to_json(dataset.to_dict())


def megre_file_datas(file_data1, file_data2, value_1, value_2, mappings):
    header1 = file_data1[0]
    # del file_data1[0]

    header2 = file_data2[0]
    # del file_data2[0]

    result1 = [list(set(row[1:])) for row in np.array(file_data1).T]
    result2 = [list(set(row[1:])) for row in np.array(file_data2).T]

    values1 = []
    values2 = []
    for key in mappings:
        key_2 = int(mappings[key])
        values1.append(result1[value_1][int(key)])
        values2.append(result2[value_2][key_2])

    merged_data = []

    merged_data.append(header1 + header2)

    i = 0;
    for index, row1 in enumerate(file_data1[1:]):
        # if( i > 50):
            # break

        if row1[value_1] in values1:
            for row2 in file_data2:
                if row2[value_2] in values2:
                    merged_data.append(row1 + row2)
                    i+=1

    return merged_data


merged_datasets_cache = {}

@FLASK.route("/datasets/merge", methods=["POST"])
def merge_datasets_info():
    json_data = request.get_json(True)

    id1 = int(json_data['mainSetId'])
    id2 = int(json_data['auxSetId'])

    value_1 = int(json_data['mainId'])
    value_2 = int(json_data['auxId'])
    mappings = json_data['mappings']

    dataset1 = Dataset.query.get(id1)
    dataset2 = Dataset.query.get(id2)


    data_interface1 = parsers.DatasetParser( os.path.realpath(dataset1.path))
    data_interface2 = parsers.DatasetParser( os.path.realpath(dataset2.path))


    merged_data = megre_file_datas(data_interface1.file_data, data_interface2.file_data,
                                    value_1,
                                    value_2,
                                    mappings)

    key = str(id1) + str(id2) + str(value_1) + str(value_2)
    for k in mappings:
        key += k
        key += mappings[k]

    merged_datasets_cache[key] = merged_data

    return key

@FLASK.route("/datasets/merge/download")
def download_datasets_info():

    csv_data = merged_datasets_cache[request.args.get('gid')]
    csv = ""
    for row in csv_data:
        row.append('\n')
        csv += ','.join([str(field) for field in row])

    response = make_response(csv)
    # This is the key: Set the right header for the response
    # to be downloaded, instead of just printed on the browser
    dataset = {
            'name': "Merged Set.csv",
            'description': "Merged Set",
            'source': "Merget Set",
            'date': 'Today',
            'path' : 'None',
            'personal': True,
            'userSubmitted': False}

    response.headers["Content-Disposition"] = "attachment; filename=" + dataset['name']
    return response


@FLASK.route("/datasets/values")
def datasets_values():
    id1 = request.args.get('firstId')
    id2 = request.args.get('secondId')

    dataset1 = Dataset.query.get(id1)
    dataset2 = Dataset.query.get(id2)

    data_interface1 = parsers.DatasetParser( os.path.realpath(dataset1.path))
    data_interface2 = parsers.DatasetParser( os.path.realpath(dataset2.path))

    result1 = [list(set(row)) for row in np.array(data_interface1.file_data[1:]).T]
    result2 = [list(set(row)) for row in np.array(data_interface2.file_data[1:]).T]
    return json.dumps({'first':result1, 'second':result2})

@FLASK.route("/datasets/merged/stat")
def stats():
    data_interface = parsers.DatasetParser(None)
    key = request.args.get('key')

    data_interface.file_data = list(merged_datasets_cache[key])
    dataset = {
            'id':key,
            'name': "Merged Set.csv",
            'description': "Merged Set",
            'source': "Merget Set",
            'date': 'Today',
            'path' : 'None',
            'personal': True,
            'userSubmitted': False}
    return data_interface.dataset_to_json(dataset)

@FLASK.route("/datasets/all")
def find_datasets_info():
    return json.dumps([dataset.to_dict() for dataset in Dataset.query.all()])
