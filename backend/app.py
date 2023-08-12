from flask import Flask, request
from flask_cors import CORS
import pymongo

# cySFrQASlOiQf2pt

mongo_URI = "mongodb+srv://9akashroy:cySFrQASlOiQf2@cluster0.hxo7td9.mongodb.net/?retryWrites=true&w=majority"

app = Flask(__name__)
CORS(app)

cluster = pymongo.MongoClient(mongo_URI)
db = cluster["flaskStatus"]
collection = db['flaskStatus2']


@app.route('/')
def index():
  return "yoyo"


@app.route("/validate", methods=['POST'])
def insert():
  if request.method == 'POST':
    data = request.json

    wadd = data.get('wallet_address')
    av = data.get('actual_value')
    fv = data.get('false_value')
    price = data.get('price')
    if (collection.find_one({"_id": wadd}) is None):
      collection.insert_one({
        "_id": wadd,
        "actual_value": av,
        "false_value": fv,
        "price: ": price
      })
      return "False"
    else:
      collection.update_one(
        {"_id": wadd},
        {"$set": {
          "actual_value": av,
          "false_value": fv,
          "price": price
        }})
      return "True"


@app.route("/isNew", methods=['POST'])
def isNew():
  if request.method == 'POST':
    data = request.json
    wadd = data.get('wallet_address')

    if (collection.find_one({"_id": wadd}) is None):
      return "True"
    else:
      return "False"


app.run(host='0.0.0.0', port=81)
