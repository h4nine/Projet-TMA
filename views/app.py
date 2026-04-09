
from flask import Flask, render_template
from pymongo import MongoClient

app = Flask(__name__)


client = MongoClient("mongodb+srv://h4nine:05qm7ymXeUMSAffL@moodify.vyyoi2k.mongodb.net/")
db = client["Moodify"] 
collection = db["emotions"]

@app.route('/')
def index():
    
    emotions_list = list(collection.find()) 
    return render_template('index.html', emotions=emotions_list)

if __name__ == '__main__':
    app.run(debug=True, port=5000)