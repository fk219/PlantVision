from flask import Flask, request, jsonify, send_file, send_from_directory
import tensorflow as tf
import numpy as np
import io  # Import the io module

app = Flask(__name__)

# Load your model globally so it's not reloaded with each request
# Replace this with the correct path to your model
model_path = "E:\\My Space\\Software Engineering\\Projects\\Machine Learning\\PlantVision\\trained_model.h5"
model = tf.keras.models.load_model(model_path)

@app.route('/')
def home():
    # Serve the index.html file from the templates directory
    return send_file('templates/home.html')

@app.route('/about')
def about():
    return send_file('templates/about.html')

@app.route('/guess')
def guess():
    return send_file('templates/guess.html')


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided.'}), 400
    file = request.files['file']
    if file:
        # Read the file data
        file_data = file.read()

        # Convert the file data to an image
        image = tf.keras.preprocessing.image.load_img(io.BytesIO(file_data), target_size=(64, 64))
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])  # Convert single image to a batch

        # Make predictions
        predictions = model.predict(input_arr)
        result_index = np.argmax(predictions)

        # Assuming you have a similar labels.txt file as in the Streamlit app
        with open("labels.txt") as f:
            labels = f.read().splitlines()

        return jsonify({'prediction': labels[result_index]})

# Placeholder for serving static files
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Placeholder for serving other HTML files
@app.route('/<path:filename>')
def other_html_files(filename):
    return send_from_directory('templates', filename)

if __name__ == '__main__':
    app.run(debug=True)
