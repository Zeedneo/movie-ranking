from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import json
import requests
app = Flask(__name__)
cors = CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/movie'
mongo = PyMongo(app)

@app.route('/search', methods=['POST','GET'])
@cross_origin()
def search_movie():
    result = {}
    content = request.get_json()
    url = "https://movie-database-imdb-alternative.p.rapidapi.com/"

    querystring = {"s":content["search"],"r":"json"}

    headers = {
    'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
    'x-rapidapi-key': "597636a391msh9897a4405dd30c5p1531d6jsnf1680b5c1fd8"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    response = json.loads(response.text)
    if response["Response"]=="False":
        return {"status":"False","Error":"Please fill search parameter","search":[],"totalPages":"0"}
        
    result["totalPages"] =  -(int(response["totalResults"])// -10 )
    result["search"] = response["Search"]
    result["status"] = "True"
    return result


@app.route('/create', methods=['POST'])
@cross_origin()
def createUser():
    myCollection = mongo.db.user
    content = request.get_json()
    myInsert = {
        "name": content["username"],
        "password": content["password"]
    }
    try:
        myCollection.insert_one(myInsert)
    except Exception as e:
        return {"status":"Create fail maybe Duplicate username"}
    return {"status": "Create succesfully"}

@app.route('/login', methods=['POST'])
@cross_origin()
def test():
    myCollection = mongo.db.user
    content = request.get_json()
    myInsert = {
        "name": content["username"],
        "password": content["password"]
    }
    query = myCollection.find(myInsert)
    output = []
    for ele in query:
        output.append({
            "name": ele["name"],
        })
    if len(output) == 0:
        return {"status": "Login Failed"}
    return {"status": "Login Success"}

@app.route('/')
@cross_origin()
def hello_world():
    myCollection = mongo.db.user
    query = myCollection.find()
    output = []
    for ele in query:
        output.append({
            "name": ele["name"],
        })
    return f'Hello, World! {output}'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='4000',debug=True)