import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types  # Import indispensable pour structurer les données
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/analyse-emotion', methods=['POST'])
def analyze_emotion():
    if 'image' not in request.files:
        return jsonify({"error": "Aucune image reçue"}), 400
    
    file = request.files['image']
    img_bytes = file.read()
    mime_type = file.content_type  # On récupère le type (image/jpeg, etc.)

    try:
        prompt = (
            "Analyse l'expression faciale sur cette image. "
            "Réponds uniquement au format JSON avec ces clés : "
            "'emotion' (un mot), 'confidence' (nombre entre 0 et 100), "
            "'analysis' (une description simple + quelques mots d'encouragement)."
        )

        # On emballe l'image dans un objet Part.from_bytes
        image_part = types.Part.from_bytes(
            data=img_bytes,
            mime_type=mime_type
        )

        response = client.models.generate_content(
            model="gemini-3.1-flash-lite-preview",
            contents=[prompt, image_part] # On envoie le prompt et la Part
        )

        # Nettoyage du texte (Gemini entoure souvent le JSON de ```json ... ```)
        raw_text = response.text.replace('```json', '').replace('```', '').strip()
        
        return jsonify(json.loads(raw_text))

    except Exception as e:
        print(f"Erreur détaillée: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)