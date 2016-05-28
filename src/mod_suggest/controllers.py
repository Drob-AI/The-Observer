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
        Dataset('Daily Weather Observations for Canberra, Australian Capital Territory for May 2016', 'Observations from Canberra Airport.', 'Observations were drawn from Canberra Airport(station 070351)','src/mod_suggest/datasets/dummy.csv', time.time()),
        Dataset('Prediction of Gene/Protein Function and Localization',
                'The genomes of several organisms have now been completely sequenced, including the human genome depending on one\'s definition of "completely" :-). Interest within bioinformatics is therefore shifting somewhat away from sequencing, to learning about the genes encoded in the sequence. Genes code for proteins, and these proteins tend to localize in various parts of cells and interact with one another, in order to perform crucial functions. The present data set consists of a variety of details about the various genes of one particular type of organism. Gene names have been anonymized and a subset of the genes have been withheld for testing',
                 'Observations were drawn from Canberra Airport(station 070351)',
                 'src/mod_suggest/datasets/interaction_relations.csv', time.time())
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
