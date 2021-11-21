import re
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import json
import requests
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['MONGO_URI'] = 'mongodb://localhost:27017/movie'
mongo = PyMongo(app)

@app.route('/search', methods=['POST','GET'])
@cross_origin()
def search_movie():
    result = {}
    content = request.get_json()
    print("content here ",content)
    if content == None or "search" not in content or content["search"]=="":
        result["totalPages"] =  0
        result["search"] = []
        result["status"] = "True"
        return result
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


@app.route('/register', methods=['POST'])
@cross_origin()
def createUser():
    myCollection = mongo.db.user
    content = request.get_json()
    if content == None or "username" not in content or "password" not in content:
        return {"status":"please fill username and password","Response":"False","ที่ส่งมา":content}
    myInsert = {
        "name": content["username"],
        "password": content["password"]
    }
    try:
        myCollection.insert_one(myInsert)
    except Exception as e:
        return {"status":"Create fail maybe Duplicate username","Response":"False"}
    return {"status": "Create succesfully","Response":"True"}


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    myCollection = mongo.db.user
    content = request.get_json()
    if content == None or "username" not in content or "password" not in content:
        print(content)
        return {"Response":"False","status":"please fill username and password"}
    myInsert = {
        "name": content["username"],
        "password": content["password"]
    }
    # query = myCollection.find(myInsert)
    query = myCollection.count_documents(myInsert)

    # output = []
    # for ele in query:
    #     output.append({
    #         "name": ele["name"],
    #     })
    # if len(output) == 0:
    if not query:
        return {"Response":"False","status": "Login Failed"}
    return {"status": "Login Success","Response":"True","username":content["username"]}

@app.route('/add2Favorite', methods=['POST'])
@cross_origin()
def addToFavorite():
    myCollection1 = mongo.db.favorite
    myCollection2 = mongo.db.movieDetails
    content = request.get_json()
    if content == None or "username" not in content or "movieID" not in content:
        return {"Response":"False","status":"please fill username and movieID"}
    print(content["username"])
    favoriteFlt = {"username":content["username"],"movieID":content["movieID"]}
    queryFavorite = myCollection1.count_documents(favoriteFlt)
    if not queryFavorite:
        myInsertToFavorite = {
                "username":content["username"],
                "movieID": content["movieID"]
        }
        try:
            myCollection1.insert_one(myInsertToFavorite)
        except Exception as e:
            print({"status":"Create fail ","Response":"False"})

    movieFlt = {"movieID":content["movieID"]}
    queryMovie = myCollection2.count_documents(movieFlt)
    if not queryMovie:
        myInsertToMovie = {
            "movieID": content["movieID"],
        }

        url = "https://movie-database-imdb-alternative.p.rapidapi.com/"
        querystring = {"r":"json","i":content["movieID"]}
        headers = {
        'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
        'x-rapidapi-key': "597636a391msh9897a4405dd30c5p1531d6jsnf1680b5c1fd8"
        }
        response = requests.request("GET", url, headers=headers, params=querystring)
        response = json.loads(response.text)
        if response["Response"] == "False":
            return {"Response":"False","status":"Incorrect IMDb ID."}
        myInsertToMovie["details"] = response
        try:
            myCollection2.insert_one(myInsertToMovie)
        except Exception as e:
            print({"status":"Create fail maybe Duplicate username","Response":"False"})
        # return {"status":"success"}

    return {"status":"Add to favorite success","Response":"True"}


@app.route('/showFavorite', methods=['POST'])
@cross_origin()
def showFavorite():
    myCollection1 = mongo.db.favorite
    myCollection2 = mongo.db.movieDetails
    content = request.get_json()
    if content == None or "username" not in content:
        return {"Response":"False","status":"please fill username."}
    print(content["username"])
    
    favoriteFlt = {"username":content["username"]}
    queryFavorite = myCollection1.find(favoriteFlt)
    output = []
    for ele in queryFavorite:
        movieFlt = {"movieID":ele["movieID"]}
        queryMovie = myCollection2.find_one(movieFlt)
        output.append(
            queryMovie["details"]
        )

    return {"status":"request granted","Response":"True","username":content["username"],"favorite":output}


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