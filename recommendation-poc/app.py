import pandas as pd
import numpy as np         
import pyrebase
from flask import Flask, request

app = Flask(__name__)
config = {
    "apiKey": "AIzaSyAg9wWi7OccQPxDYWWKIeNMdcOvds-3_iE",
    "authDomain": "workout-clock.firebaseapp.com",
    "databaseURL": "https://workout-clock.firebaseio.com",
    "projectId": "workout-clock",
    "storageBucket": "workout-clock.appspot.com",
    "messagingSenderId": "563160271644",
    "appId": "1:563160271644:web:c939c10fd327bd27d508d9"
}

NO_OF_RECOMMENDATIONS = 20

firebase = pyrebase.initialize_app(config)
db = firebase.database()


def getRatings():
  ratings = db.child("videos").get().val()
  ratings = pd.DataFrame(ratings)
  return ratings.T


def preprocess():
  ratings = getRatings()
  df = pd.read_csv("./ratings_small.csv")
  df.drop("timestamp", inplace=True, axis=1)
  df = df.pivot_table(index=["userId"],columns=["movieId"], values="rating")
  df = df.dropna(thresh=10, axis=1).fillna(0)
  item_similarity = df.corr()
  return item_similarity

def get_similar(id):
  item_similarity = preprocess()
  print(item_similarity)
  sorted_sim = item_similarity.sort_values(by=id, ascending=False)[id]
  rec_list = list(sorted_sim.index)
  return rec_list[:NO_OF_RECOMMENDATIONS]
import json
@app.route('/')
def get_recommendations():
    id_  = request.args.get("id")
    rec = get_similar(int(id_))
    
    return json.dumps(rec)

if __name__ == '__main__':
    app.run(debug=True)
    #rec = get_similar(1)
    print(rec)
    
    