import pandas as pd
import numpy as np         
import pyrebase
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

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
  ratings = db.child("ratings").get().val()
  ratings = pd.DataFrame(ratings).T
  ratings.rating = ratings.rating.astype("int64")
  return ratings


def preprocess():
  df = getRatings()

  # df = pd.read_csv("./ratings_small.csv")
  # df.drop("timestamp", inplace=True, axis=1)
  #print(df)
  df = df.pivot_table(index=["userId"],columns=["movieId"], values="rating")
  #df = df.dropna(thresh=10, axis=1).fillna(0)
  item_similarity = df.corr()
  print(item_similarity)
  return item_similarity

def get_similar_movies(movie_id, user_rating):
  item_similarity = preprocess()
  print("item sim")
  print(item_similarity)
  similar_score = item_similarity[movie_id]*(user_rating)
  similar_score=similar_score.sort_values(ascending=False)

  return similar_score

def get_history(user_id):
  ratings = db.child("ratings").get().val()
  df  = pd.DataFrame(ratings).T
  df = df[df.userId==user_id]
  df = df.drop_duplicates(subset=['movieId'], keep='last')
  history = []
  for index, row in df.iterrows():
    history.append([row["movieId"],int(row["rating"])])
  return history

def get_recommendations(user_id):
  user_history = get_history(user_id)
  # print("user hist")
  # print(user_history)
  similar_movies = pd.DataFrame()
  for movie,rating in user_history:
    similar_movies = similar_movies.append(get_similar_movies(movie,rating),ignore_index=True)
  similar_movies = similar_movies.sum().sort_values(ascending=False)
  return similar_movies

import json
@app.route('/')
@cross_origin()
def index():
    id_  = request.args.get("id")
    if id_:
      rec = get_recommendations(id_)
      rec = rec.index.tolist()
      print()
      return json.dumps(rec)
    return "Something wrong"

if __name__ == '__main__':
  print(get_recommendations("rj33536"))
  app.run(debug=True)
    
    
    