import datetime
import os
import src.mod_suggest.datasets_parser as parsers
import time
import json
# Import the database object from the main app module
from src import DB, FLASK

from src.mod_suggest.models import Dataset

from flask import request


@FLASK.route("/delete-datasets")
def delete_dataset_info():
    Dataset.query.delete()
    DB.session.commit()
    return "Deleted"

@FLASK.route("/create-datasets")
def create_dataset_info():
    models = [
        Dataset('Daily Weather Observations for Canberra, Australian Capital Territory for May 2016', 'Observations from Canberra Airport.', 'Observations were drawn from Canberra Airport(station 070351)','src/mod_suggest/datasets/dummy.csv', time.time())
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

@FLASK.route("/datasets/all")
def find_datasets_info():
    return json.dumps([dataset.to_dict() for dataset in Dataset.query.all()])
