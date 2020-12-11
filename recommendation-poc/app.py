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

def get_similar_movies(movie_id, user_rating):
  item_similarity = preprocess()
  similar_score = item_similarity[movie_id]*(user_rating-2.5)
  similar_score=similar_score.sort_values(ascending=False)

  return similar_score

def get_history(user_id):
  return [(1172,4),(1129,2.0)]

def get_recommendations(user_id):
  user_history = get_history(user_id)
  similar_movies = pd.DataFrame()
  for movie,rating in user_history:
    similar_movies = similar_movies.append(get_similar_movies(movie,rating),ignore_index=True)
  similar_movies = similar_movies.sum().sort_values(ascending=False)
  return similar_movies

print(get_recommendations("1"))
import json
@app.route('/')
def index():
    id_  = request.args.get("id")
    if id_:
      rec = get_recommendations(id_)
    
      return rec.to_json()
    return "Something wrong"

if __name__ == '__main__':
    app.run(debug=True)
    
    
    