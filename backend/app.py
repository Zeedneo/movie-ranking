from flask import Flask, request

import requests
app = Flask(__name__)

@app.route('/search', methods=['POST'])
def search_movie():
    myName = request.args.get("patient_room")
    return f'search {myName}'

@app.route('/')
def hello_world():
    url = "https://movie-database-imdb-alternative.p.rapidapi.com/"

    querystring = {"s":"witcher","r":"json"}

    headers = {
    'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
    'x-rapidapi-key': "597636a391msh9897a4405dd30c5p1531d6jsnf1680b5c1fd8"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    # print(response.text)
    return response.text
    # return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='4000',debug=True)