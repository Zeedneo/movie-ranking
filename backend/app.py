from flask import Flask, request
import json
import requests
app = Flask(__name__)

@app.route('/search', methods=['POST'])
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
        return {"status":"False","Error":"Please fill search parameter"}
        
    result["totalPages"] =  -(int(response["totalResults"])// -10 )
    result["search"] = response["Search"]
    result["status"] = "True"
    return result

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='4000',debug=True)