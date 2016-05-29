import datetime
import os
import src.mod_suggest.datasets_parser as parsers
import time
import json
# Import the database object from the main app module
from src import DB, FLASK

from src.mod_suggest.models import Dataset

from flask import request
from flask import make_response

import numpy as np

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
    dataset = Dataset.query.get(id)
    path = os.path.realpath('src/mod_suggest/datasets/my_model.pkl')

    csv = open(path, 'r').read()
    response = make_response(csv)

    response.headers["Content-Disposition"] = "attachment; filename=" + dataset.name
    return response

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

def megre_file_datas(file_data1, file_data2, merge_config):
    header1 = file_data1[0]
    # del file_data1[0]

    header2 = file_data2[0]
    # del file_data2[0]

    merge_index1 = merge_config[0]['index']
    merge_index2 = merge_config[1]['index']

    merged_data = []


    merged_data.append(header1 + header2)
    for row1 in file_data1:
        if row1[merge_index1] == merge_config[0]['val']:
            for row2 in file_data2:
                if row2[merge_index2] == merge_config[1]['val']:
                    merged_data.append(row1 + row2)

    return merged_data

merged_datasets_cache = {}
@FLASK.route("/datasets/merge")
def merge_datasets_info():
    id1 = request.args.get('firstId')
    id2 = request.args.get('secondId')

    dataset1 = Dataset.query.get(id1)
    dataset2 = Dataset.query.get(id2)

    data_interface1 = parsers.DatasetParser( os.path.realpath(dataset1.path))
    data_interface2 = parsers.DatasetParser( os.path.realpath(dataset2.path))

    match_list = [{'index': 0, 'val':'2016-05-1'}, {'index': 0, 'val':'G238510'}]

    merged_data = megre_file_datas(data_interface1.file_data, data_interface2.file_data, match_list)

    key = str(id1) + str(id2) + str(match_list[0]['index']) + str(match_list[1]['index'])
    merged_datasets_cache[key] = merged_data
    return json.dumps(merged_data)

@FLASK.route("/datasets/values")
def datasets_values():
    id1 = request.args.get('firstId')
    id2 = request.args.get('secondId')

    dataset1 = Dataset.query.get(id1)
    dataset2 = Dataset.query.get(id2)

    data_interface1 = parsers.DatasetParser( os.path.realpath(dataset1.path))
    data_interface2 = parsers.DatasetParser( os.path.realpath(dataset2.path))

    print(np.array(data_interface1.file_data[1:]).T)

    result1 = [list(set(row)) for row in np.array(data_interface1.file_data[1:]).T]
    result2 = [list(set(row)) for row in np.array(data_interface2.file_data[1:]).T]
    return json.dumps({'first':result1, 'second':result2})

@FLASK.route("/datasets/merged/stat")
def stats():
    data_interface = parsers.DatasetParser(None)
    key = request.args.get('firstId') + request.args.get('secondId') + request.args.get('index1') + request.args.get('index2')

    data_interface.file_data = merged_datasets_cache[key]

    dataset = {'name': "Merged Set",
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
