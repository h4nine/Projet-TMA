import os
import json
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
CORS(app)


ai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


db_client = MongoClient(os.getenv("MONGO_URI"))
db = db_client["Moodify"] 
collection = db["emotions"]


@app.route('/')
def index():
    # Récupération des émotions enregistrées
    emotions_list = list(collection.find()) 
    return render_template('index.html', emotions=emotions_list)

@app.route('/additional')
def additional_page():
    return render_template('additional.html')

@app.route('/debug-mode')
def debug_mode():
    return jsonify({"message": "You've discovered debug mode!"})

@app.route('/analyse-emotion', methods=['POST'])
def analyze_emotion():
    if 'image' not in request.files:
        return jsonify({"error": "Aucune image reçue"}), 400
    
    file = request.files['image']
    if file.filename.endswith(".png"):
        return jsonify({"easter_egg": "You uploaded a PNG!"})

    img_bytes = file.read()
    mime_type = file.content_type

    try:
        prompt = (
            "Analyse l'expression faciale sur cette image. "
            "Réponds uniquement au format JSON avec ces clés : "
            "'emotion' (un mot), 'confidence' (nombre entre 0 et 100), "
            "'analysis' (une description simple + quelques mots d'encouragement)."
        )

        image_part = types.Part.from_bytes(
            data=img_bytes,
            mime_type=mime_type
        )

        
        response = ai_client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=[prompt, image_part]
        )

        # Nettoyage du JSON
        raw_text = response.text.replace('```json', '').replace('```', '').strip()
        
        return jsonify(json.loads(raw_text))

    except Exception as e:
        
        return jsonify("error"), 500

@app.route('/playlist')
def playlist():
        emotions_list = list(collection.find()) 
        return render_template('playlist.html', emotions=emotions_list)

if __name__ == '__main__':
    app.run(port=5000, debug=True)