from os import minor
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import json
import requests
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/movie'
mongo = PyMongo(app)

url = "https://movie-database-imdb-alternative.p.rapidapi.com/"
headers = {
            'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
            'x-rapidapi-key': "597636a391msh9897a4405dd30c5p1531d6jsnf1680b5c1fd8"
        }

# @app.route('/search', methods=['POST', 'GET'])
# @cross_origin()
# def search_movie():
#     result = {}
#     content = request.get_json()
#     current_page = 1
#     filType = ""
#     print("content here ", content)
#     if content == None or "search" not in content or content["search"] == "":
#         result = {
#             "totalPages": 0,
#             "search": [],
#             "status": "True"
#         }
#         return result
#     if "page" in content:
#         current_page = content["page"]
#     if "type" in content:
#         filType = content["type"]
#     url = "https://movie-database-imdb-alternative.p.rapidapi.com/"
#     querystring = {"s": content["search"], "r": "json", "page": current_page, "type":filType}
#     headers = {
#         'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
#         'x-rapidapi-key': "597636a391msh9897a4405dd30c5p1531d6jsnf1680b5c1fd8"
#     }

#     response = requests.request("GET", url, headers=headers, params=querystring)
#     response = json.loads(response.text)
#     if response["Response"] == "False":
#         return {"status": "False", "Error": "Please fill search parameter or page parameter out of range.", "search": [], "totalPages": "0"}

#     result["totalPages"] = -(int(response["totalResults"]) // -10)
#     result["search"] = response["Search"]
#     result["status"] = "True"
#     result["page"] = current_page
#     return result


@app.route('/search', methods=['POST', 'GET'])
@cross_origin()
def search_movie2():
    result = {}
    content = request.get_json()
    min_page = 1
    i_min=0
    max_page = 1
    i_max=0
    filType = ""
    print("content here ", content)
    if content == None or "search" not in content or content["search"] == "":
        result = {
            "totalPages": 0,
            "search": [],
            "status": "True"
        }
        return result
    if "page" in content:
        i_max=int(content["page"])*6
        i_min = i_max - 5
        max_page = ( i_max)//10 + 1
        min_page = ( i_min )//10 + 1
    if "type" in content:
        filType = content["type"]
    res = []

    if min_page == max_page:
        querystring = {"s": content["search"], "r": "json", "page": min_page, "type":filType}
        response = requests.request("GET", url, headers=headers, params=querystring)
        response = json.loads(response.text)
        if response["Response"] == "False":
            return {"status": "False", "Error": "Please fill search parameter or page parameter out of range.", "search": [], "totalPages": "0"}
        for i in response["Search"][ (i_min-1)%10: (i_max)%10]:
            res.append(i)
        result["totalPages"] = -(int(response["totalResults"]) // -6)
    else:
        querystring1 = {"s": content["search"], "r": "json", "page": min_page, "type":filType}
        querystring2 = {"s": content["search"], "r": "json", "page": max_page, "type":filType}
        response1 = requests.request("GET", url, headers=headers, params=querystring1)
        response2 = requests.request("GET", url, headers=headers, params=querystring2)
        response1 = json.loads(response1.text)
        response2 = json.loads(response2.text)
        if response2["Response"] == "False":
            return {"status": "False", "Error": "Please fill search parameter or page parameter out of range.", "search": [], "totalPages": "0"}
        for i in response1["Search"][ (i_min-1)%10:]:
            res.append(i)
        for i in response2["Search"][ :(i_max)%10]:
            res.append(i)  
        result["totalPages"] = -(int(response1["totalResults"]) // -6)

    result["search"] = res
    result["status"] = "True"
    result["page"] = content["page"]
    return result


@app.route('/register', methods=['POST'])
@cross_origin()
def createUser():
    myCollection = mongo.db.user
    content = request.get_json()
    if content == None or "username" not in content or "password" not in content:
        return {"status": "please fill username and password", "Response": "False", "ที่ส่งมา": content}
    myInsert = {
        "name": content["username"],
        "password": content["password"]
    }
    try:
        myCollection.insert_one(myInsert)
    except Exception as e:
        return {"status": "Create fail maybe Duplicate username", "Response": "False"}
    return {"status": "Create succesfully", "Response": "True"}


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    myCollection = mongo.db.user
    content = request.get_json()
    if content == None or "username" not in content or "password" not in content:
        print(content)
        return {"Response": "False", "status": "please fill username and password"}
    myInsert = {
        "name": content["username"],
        "password": content["password"]
    }
    query = myCollection.count_documents(myInsert)
    if not query:
        return {"Response": "False", "status": "Login Failed"}
    return {"status": "Login Success", "Response": "True", "username": content["username"]}


@app.route('/add2Favorite', methods=['POST'])
@cross_origin()
def addToFavorite():
    myCollection1 = mongo.db.favorite
    myCollection2 = mongo.db.movieDetails
    content = request.get_json()
    if content == None or "username" not in content or "movieID" not in content:
        return {"Response": "False", "status": "please fill username and movieID"}
    print(content["username"])
    favoriteFlt = {
        "username": content["username"], "movieID": content["movieID"]}
    queryFavorite = myCollection1.count_documents(favoriteFlt)
    if not queryFavorite:
        myInsertToFavorite = {
            "username": content["username"],
            "movieID": content["movieID"]
        }
        try:
            myCollection1.insert_one(myInsertToFavorite)
        except Exception as e:
            print({"status": "Create fail ", "Response": "False"})

    movieFlt = {"movieID": content["movieID"]}
    queryMovie = myCollection2.count_documents(movieFlt)
    if not queryMovie:
        myInsertToMovie = {
            "movieID": content["movieID"],
        }

        querystring = {"r": "json", "i": content["movieID"]}
        response = requests.request("GET", url, headers=headers, params=querystring)
        response = json.loads(response.text)
        if response["Response"] == "False":
            return {"Response": "False", "status": "Incorrect IMDb ID."}
        myInsertToMovie["details"] = response
        try:
            myCollection2.insert_one(myInsertToMovie)
        except Exception as e:
            print({"status": "Create fail maybe Duplicate username",
                  "Response": "False"})


    return {"status": "Add to favorite success", "Response": "True"}


@app.route('/showFavorite', methods=['POST'])
@cross_origin()
def showFavorite():
    myCollection1 = mongo.db.favorite
    myCollection2 = mongo.db.movieDetails
    content = request.get_json()
    if content == None or "username" not in content:
        return {"Response": "False", "status": "please fill username."}
    print("show fav ",content)

    favoriteFlt = {"username": content["username"]}
    queryFavorite = myCollection1.find(favoriteFlt)
    output = []
    for ele in queryFavorite:
        movieFlt = {"movieID": ele["movieID"]}
        queryMovie = myCollection2.find_one(movieFlt)
        if "type" in content and content["type"] !="" and queryMovie["details"]["Type"] != content["type"]:
            continue
        output.append(
            queryMovie["details"]
        )

    return {"status": "request granted", "Response": "True", "username": content["username"], "favorite": output}


@app.route('/removeFavorite',methods=['POST'])
@cross_origin()
def remmove():
    myCollection = mongo.db.favorite
    content = request.get_json()
    if content == None or "username" not in content or "movieID" not in content:
        return {"Response": "False", "status": "please fill username and movieID."}
    filt_delete = {"username":content["username"],"movieID":content["movieID"]}
    myCollection.delete_one(filt_delete)
    return {"Response":"True","status":"delete success"}


@app.route('/getInfo',methods=['POST'])
@cross_origin()
def get_info():
    myCollection = mongo.db.movieDetails
    content = request.get_json()
    print("getinfo ",content)
    if content == None or "movieID" not in content:
        return {"Response": "False", "status": "please fill movieID."}
    movieFlt = {"movieID": content["movieID"]}
    countMovie = myCollection.count_documents(movieFlt)
    if countMovie:
        query = myCollection.find_one(movieFlt)
        return {"result":query["details"],"Response": "True", "status": "request granted"}

    else:
        myInsertToMovie = {
            "movieID": content["movieID"],
        }
        querystring = {"r":"json","i":content["movieID"]}
        response = requests.request("GET", url, headers=headers, params=querystring)
        response = json.loads(response.text)
        if response["Response"] == "False":
            return {"Response": "False", "status": "Incorrect IMDb ID."}
        myInsertToMovie["details"] = response
        try:
            myCollection.insert_one(myInsertToMovie)
        except Exception as e:
            print({"status": "Create fail",
                  "Response": "False"})
        return {"result":response,"Response": "True", "status": "request granted"}



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
    app.run(host='0.0.0.0', port='4000', debug=True)
