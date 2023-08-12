from flask import Flask, request
from flask_cors import CORS
import pymongo

# cySFrQASlOiQf2pt

mongo_URI = "mongodb+srv://9akashroy:AkoxJp6aONZMqpGP@cluster0.pad3mfx.mongodb.net/?retryWrites=true&w=majority"
app = Flask(__name__)
CORS(app)

cluster = pymongo.MongoClient(mongo_URI)
db = cluster["UserInfo"]
collection = db['Hubs']


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

@app.route("/do")
def dbupdate():
  collection.insert_one({
        "_id": 4,
        "wid0": "avqki59ck1jkq77ola5y0kj7inzyvsan",
        "wid1": "cfhezx27vbzwrg4xp01omb70fet1vsvf",
        "wid2": "6xe65w8k3q38kudp5csb5kh9i3f9tu61",
        "wid3": "5epn8gq6oykoih290ipnxt6l6cue4fxn",
        "wid4": "l48ntyum9vz02mpwg7o02kxcbvga7slx",
        "wid5": "2v958j6ml0mfal5i17b6iaupln398yan",
        "wid6": "uqi59z6i8uovoihhlduh8wqdq8bmukwd",
        "wid7": "al8cy7bxx1uyhyzgaw4msid442mp8a78",
        "wid8": "jgmuom2fqw8lsfx0zgueo98sa4xmaj51",
        "wid9": "7b92ipdnjteliop98eqkt78fzk5r6kz1",
  })
  return "ok"

# import string
# import random
 
# N = 32
 
# res = ''.join(random.choices(string.ascii_lowercase +
#                              string.digits, k=N))
# print("{",end="")
# for i in range(10):
#     print('"wid'+str(i)+'":', end = " ")
#     res = ''.join(random.choices(string.ascii_lowercase + string.digits, k=N))
#     print('"',end="")
#     print(res, end = "")
#     print('"',end="")
#     print(",")
# print("}")
     

if __name__ == "__main__":
    app.run(debug=True)
