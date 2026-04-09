import json
import base64
import os

# Chemins des dossiers
folder_path = "moodify-emotions"
json_path = os.path.join("emotions.json")
output_path = os.path.join(folder_path, "emotions_with_images.json")

# 1. Charger le fichier JSON original
with open(json_path, "r", encoding="utf-8") as f:
    emotions = json.load(f)

# 2. Parcourir chaque élément du JSON
for i in emotions:
    emotion_name = i["emotion"]
    image_filename = f"{emotion_name}.png"
    image_path = os.path.join(folder_path, image_filename)

    # Vérifier si l'image existe sur le disque
    if os.path.exists(image_path):
        with open(image_path, "rb") as f_img:
            binary_data = f_img.read()
            # Convertir en base64 pour que le JSON puisse l'accepter
            base64_image = base64.b64encode(binary_data).decode('utf-8')
            # Ajouter le préfixe pour que ce soit prêt à l'emploi (HTML/Apps)
            i["image"] = f"data:image/png;base64,{base64_image}"
            print(f"Image ajoutée pour : {emotion_name}")
    else:
        i["image"] = None
        print(f"Image manquante pour : {emotion_name} (attendu: {image_filename})")

# 3. Sauvegarder le nouveau JSON complet
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(emotions, f, indent=4, ensure_ascii=False)

print(f"\nTerminé ! Fichier sauvegardé sous : {output_path}")