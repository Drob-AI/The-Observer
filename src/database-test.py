import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
from contextlib import closing

# configuration
DATABASE = '/tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'admin'
USERNAME = 'admin'
PASSWORD = 'admin'

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

app.config.from_envvar('FLASKR_SETTINGS', silent=True)

def init_db():
    print("fua");
    with closing(connect_db()) as db:
        print(db)
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
            print(f)
        db.commit()

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

if __name__ == '__main__':
    init_db()
    app.run()
