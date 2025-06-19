# import os
# import tensorflow as tf
# import numpy as np
# from flask import Flask, request, jsonify
# from werkzeug.utils import secure_filename
# from huggingface_hub import hf_hub_download, login
# from dotenv import load_dotenv

# load_dotenv() # Load environment variables from .env file

# huggingface_token = os.getenv("HUGGINGFACE_TOKEN")

# # Hugging Face Login
# HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")  # Use environment variable
# if not HUGGINGFACE_TOKEN:
#     raise ValueError("HUGGINGFACE_TOKEN environment variable not set")
# login(token=HUGGINGFACE_TOKEN)

# # Flask App Setup
# app = Flask(__name__)
# UPLOAD_FOLDER = 'static/uploads'
# MODEL_DIR = 'models'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(MODEL_DIR, exist_ok=True)

# # Download Model from Hugging Face (if not already present)
# repo_id = "Furqank218/plantvision-api"
# model_path = hf_hub_download(repo_id=repo_id, filename="trained_model.h5", local_dir=MODEL_DIR, force_download=False)
# model = tf.keras.models.load_model(model_path)

# # Class Labels
# IMAGE_SIZE = (64, 64)
# class_names = [
#     'Apple', 'Banana', 'Beetroot', 'Bell Pepper', 'Cabbage', 'Capsicum', 'Carrot',
#     'Cauliflower', 'Chilli Pepper', 'Corn', 'Cucumber', 'Eggplant', 'Garlic',
#     'Ginger', 'Grapes', 'Jalepeno', 'Kiwi', 'Lemon', 'Lettuce', 'Mango', 'Onion',
#     'Orange', 'Paprika', 'Pear', 'Peas', 'Pineapple', 'Pomegranate', 'Potato',
#     'Raddish', 'Soy Beans', 'Spinach', 'Sweetcorn', 'Sweetpotato', 'Tomato',
#     'Turnip', 'Watermelon'
# ]

# # Image Preprocessing
# def preprocess_image(image_path):
#     image = tf.keras.preprocessing.image.load_img(image_path, target_size=IMAGE_SIZE)
#     input_arr = tf.keras.preprocessing.image.img_to_array(image)
#     input_arr = np.expand_dims(input_arr, axis=0)
#     return input_arr

# # Enable CORS
# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
#     return response

# # Routes
# @app.route('/', methods=['GET'])
# def home():
#     return jsonify({
#         "project": "PlantVision",
#         "description": "AI-powered fruit & vegetable classifier using TensorFlow. Created by Furqan Khan."
#     })

# @app.route('/status', methods=['GET'])
# def status():
#     return jsonify({
#         "status": "✅ Running",
#         "endpoints": {
#             "/": "Project overview",
#             "/status": "API health check",
#             "/label": "Get list of labels",
#             "/predict": "POST an image to get prediction"
#         }
#     })

# @app.route('/label', methods=['GET'])
# def get_labels():
#     return jsonify({
#         "label_count": len(class_names),
#         "labels": class_names
#     })

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No filename provided"}), 400

#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     file.save(filepath)

#     image_batch = preprocess_image(filepath)
#     predictions = model.predict(image_batch)
#     class_index = np.argmax(predictions)
#     confidence = float(np.max(predictions))

#     return jsonify({
#         "prediction": class_names[class_index],
#         "confidence": confidence,
#         "filename": filename
#     })

# # Run the App
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 3000))
#     app.run(host='0.0.0.0', port=port, debug=False)


import os
import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from huggingface_hub import hf_hub_download, login
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()  # Load environment variables from .env file

# Hugging Face Login
HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")
if not HUGGINGFACE_TOKEN:
    raise ValueError("HUGGINGFACE_TOKEN environment variable not set")
login(token=HUGGINGFACE_TOKEN)

# Flask App Setup
app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
MODEL_DIR = 'models'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODEL_DIR, exist_ok=True)

# Download and Load Model from Hugging Face
repo_id = "Furqank218/plantvision-api"
try:
    model_path = hf_hub_download(repo_id=repo_id, filename="trained_model.h5", local_dir=MODEL_DIR, force_download=False)
    model = tf.keras.models.load_model(model_path)
    logger.info("Model loaded successfully from %s", model_path)
except Exception as e:
    logger.error("Failed to load model: %s", str(e))
    raise

# Class Labels
IMAGE_SIZE = (32, 32)  # Reduced from 64x64 for faster inference; try 16x16 if needed
class_names = [
    'Apple', 'Banana', 'Beetroot', 'Bell Pepper', 'Cabbage', 'Capsicum', 'Carrot',
    'Cauliflower', 'Chilli Pepper', 'Corn', 'Cucumber', 'Eggplant', 'Garlic',
    'Ginger', 'Grapes', 'Jalepeno', 'Kiwi', 'Lemon', 'Lettuce', 'Mango', 'Onion',
    'Orange', 'Paprika', 'Pear', 'Peas', 'Pineapple', 'Pomegranate', 'Potato',
    'Raddish', 'Soy Beans', 'Spinach', 'Sweetcorn', 'Sweetpotato', 'Tomato',
    'Turnip', 'Watermelon'
]

# Image Preprocessing
def preprocess_image(image_path):
    try:
        image = tf.keras.preprocessing.image.load_img(image_path, target_size=IMAGE_SIZE)
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.expand_dims(input_arr, axis=0)
        return input_arr
    except Exception as e:
        logger.error("Image preprocessing failed: %s", str(e))
        raise

# Enable CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    return response

# Routes
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "project": "PlantVision",
        "description": "AI-powered fruit & vegetable classifier using TensorFlow. Created by Furqan Khan."
    })

@app.route('/status', methods=['GET'])
def status():
    return jsonify({
        "status": "✅ Running",
        "endpoints": {
            "/": "Project overview",
            "/status": "API health check",
            "/label": "Get list of labels",
            "/predict": "POST an image to get prediction"
        }
    })

@app.route('/label', methods=['GET'])
def get_labels():
    return jsonify({
        "label_count": len(class_names),
        "labels": class_names
    })

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No filename provided"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    try:
        file.save(filepath)
        image_batch = preprocess_image(filepath)
        predictions = model.predict(image_batch)
        class_index = np.argmax(predictions)
        confidence = float(np.max(predictions))
        logger.info("Prediction successful for %s: %s (%.2f%%)", filename, class_names[class_index], confidence * 100)
        return jsonify({
            "prediction": class_names[class_index],
            "confidence": confidence,
            "filename": filename
        })
    except Exception as e:
        logger.error("Prediction failed for %s: %s", filename, str(e))
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

# Run the App
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    logger.info("Starting app on port %d", port)
    app.run(host='0.0.0.0', port=port, debug=False)

