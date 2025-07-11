# PlantVision Backend: AI-Powered Fruit & Vegetable Classifier

## Created by
Furqan Khan

## Features
- Image classification for fruits and vegetables
- API for accessing predictions
- Provides a list of supported labels

## Technologies Used
- Python
- Flask
- TensorFlow
- Hugging Face Hub
- NumPy
- Werkzeug
- Gunicorn
- Pillow
- python-dotenv

## Setup and Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- **Git:** For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/).
- **Python:** Version 3.8 or higher is recommended. You can download it from [python.org](https://www.python.org/).
- **pip:** Python's package installer, usually comes with Python.

You can verify your Python and pip installations by running:
bash
python --version
pip --version


## Installation Steps
- ** Clone the repository: Replace <repository-url> with the actual URL of this repository.

git clone https://github.com/yourusername/yourrepository.git
cd yourrepository # Or your chosen directory name

- ** Create and activate a virtual environment: It's highly recommended to use a virtual environment to isolate project dependencies and avoid conflicts with other Python projects.

python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts ctivate`

- **Install project dependencies: The requirements.txt file lists all necessary Python packages.
pip install -r requirements.txt

- **Configure Environment Variables: Create a .env file in the root directory of the project. This file will store your Hugging Face API token and an optional port number.

# .env
HUGGINGFACE_TOKEN="your_actual_hugging_face_api_token"
# PORT=5000 (Optional: Uncomment to use port 5000. If not set, the application defaults to port 3000 as defined in main.py)

Replace "your_actual_hugging_face_api_token" with your valid Hugging Face API token.

## Running the Application
To run the application, execute:

python main.py

*If the setup is correct and the server starts successfully, you should see output similar to this in your console:

 * Serving Flask app 'main'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment.
Use a production WSGI server instead.
 * Running on http://0.0.0.0:3000  # Or your configured port
Press CTRL+C to quit

The application will run on port 3000 by default (as specified in main.py if no PORT environment variable is set) or the port you've specified in your .env file (e.g., PORT=5000).

To access the application, open your web browser and navigate to: http://127.0.0.1:PORT or http://localhost:PORT Replace PORT with 3000 (default) or the value you set in the .env file. For example, http://127.0.0.1:3000.

## API Endpoints
GET /:
Description: Provides a brief overview of the project.
GET /status:
Description: Checks the API health and lists available endpoints.
GET /label:
Description: Retrieves a list of all possible classification labels and their count.
POST /predict:
Description: Upload an image to get a classification prediction. Supports common image formats like JPG, PNG, etc.
Parameters:
file: The image file to be classified (multipart/form-data).

*Example Request (using cURL): Replace /path/to/your/image.jpg with the actual path to an image file and ensure the port (e.g., 3000) matches your application's configuration.

curl -X POST -F "file=@/path/to/your/image.jpg" http://127.0.0.1:3000/predict

**Example Successful Response (JSON): The confidence score is a float between 0 and 1.
{
  "prediction": "Tomato",
  "confidence": 0.9876,
  "filename": "image.jpg"
}

**Error Responses: Errors will also be returned in JSON format.
{
  "error": "No file part"
}
Or:
{
  "error": "File type not allowed"
}
Or:
{
  "error": "Prediction failed due to an internal issue."
}
(Actual error messages may vary based on the specific issue).

## Model Details
**Origin: The model is sourced from Furqank218/plantvision-api on Hugging Face Hub.
**Type: Image classification model specifically trained to identify various fruits and vegetables. In the context of this project, "image classification" means the model is trained to identify the primary subject in an image from a predefined list of fruits and vegetables.
**Classes: The model can classify the following fruits and vegetables. This extensive list covers a wide variety of common items:
-Apple
-Banana
-Beetroot
-Bell Pepper
-Cabbage
-Capsicum
-Carrot
-Cauliflower
-Chilli Pepper
-Corn
-Cucumber
-Eggplant
-Garlic
-Ginger
-Grapes
-Jalepeno
-Kiwi
-Lemon
-Lettuce
-Mango
-Onion
-Orange
-Paprika
-Pear
-Peas
-Pineapple
-Pomegranate
-Potato
-Raddish
-Soy Beans
-Spinach
-Sweetcorn
-Sweetpotato
-Tomato
-Turnip
-Watermelon

**Directory Structure
.
├── main.py             # Main Flask application file
├── models/             # Directory for the downloaded machine learning model
├── static/
│   └── uploads/        # Default folder for uploaded images
├── requirements.txt    # Project dependencies
└── README.md           # This file
Contributing
Contributions are welcome. Please open an issue or submit a pull request.



## License
This project is currently not licensed. Consider adding an MIT License if it's intended to be open source.


## MIT License

Copyright (c) | Furqan Khan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
