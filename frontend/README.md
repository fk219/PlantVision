# Plant Vision Frontend: AI-Powered Fruit and Vegetable Identifier

**Plant Vision** is a web application that uses Artificial Intelligence to identify various fruits and vegetables from user-uploaded images. Upload a picture, and the AI will tell you what it is! This project showcases the integration of a machine learning model with a modern React frontend.

## Key Features
*   **AI-Powered Identification:** Utilizes a Convolutional Neural Network (CNN) to predict the type of fruit or vegetable.
*   **Image Upload:** Simple interface to upload images directly from your device.
*   **Fast Predictions:** Get identification results quickly.
*   **Confidence Score:** View the confidence level of each prediction.
*   **User-Friendly Interface:** Clean and intuitive design built with React and Tailwind CSS.
*   **Responsive Design:** Works on various screen sizes.
*   **Page Transitions:** Smooth animations using GSAP for a better user experience.

## How it Works
The application allows users to navigate to a "Predict" page where they can upload an image. This image is then sent to a backend API endpoint (`https://localhost:5000/predict`) which hosts the AI model. The model processes the image and returns the predicted fruit/vegetable name along with a confidence score. The frontend then displays this result to the user.

The `About` page provides more insight into the model's architecture (a custom CNN built with TensorFlow/Keras, achieving ~92.6% accuracy on its training set) and the development process.

## Recognizable Plants
The model can currently identify the following fruits and vegetables:
Apple, Banana, Beetroot, Bell Pepper, Cabbage, Capsicum, Carrot, Cauliflower, Chilli pepper, Corn, Cucumber, Eggplant, Garlic, Ginger, Grapes, Jalepeno, Kiwi, Lemon, Lettuce, Mango, Onion, Orange, Paprika, Pear, Peas, Pineapple, Pomegranate, Potato, Raddish, Soy beans, Spinach, Sweetcorn, Sweetpotato, Tomato, Turnip, Watermelon.

## Technologies Used
*   **Frontend:**
    *   React
    *   Vite (Build Tool)
    *   Tailwind CSS (Styling)
    *   React Router DOM (Routing)
    *   GSAP (Animations)
    *   Lucide React & Heroicons (Icons)
*   **AI/Backend Interaction:**
    *   The application interacts with a backend API hosting a custom-trained Convolutional Neural Network (CNN).
    *   The model was originally built and trained using TensorFlow/Keras.

## Folder Architecture
vite-react-starter/
├── .gitignore           # Git ignore file
├── README.md            # Project README file
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML entry point for Vite
├── package-lock.json    # Exact versions of project dependencies
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite build tool configuration
└── src/                 # Main source code directory
    ├── App.jsx          # Main application component (layout, routing)
    ├── main.jsx         # React application entry point
    ├── index.css        # Global styles / Tailwind base
    ├── components/      # Reusable UI components
    │   ├── Navbar.jsx   # Navigation bar component
    │   └── Footer.jsx   # Footer component
    └── pages/           # Page-level components
        ├── Home.jsx     # Home page
        ├── About.jsx    # About page
        └── Predict.jsx  # Predict page (core functionality)

This structure provides a high-level overview of where key files and directories are located within the project.

## Getting Started / Usage
To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will typically start the application on `http://localhost:5173`.
4.  **Using the App:**
    *   Navigate to the "Predict" page using the navigation bar.
    *   Click "Choose Image" or drag and drop an image file onto the designated area.
    *   Click "Identify Plant" to see the AI's prediction.

## About the Project

Plant Vision was developed as a solo project to explore and implement a full-stack image recognition application. The AI model is a Convolutional Neural Network (CNN) trained from scratch (without leveraging pre-trained models beyond standard libraries) using TensorFlow/Keras, focusing on a dataset of common fruits and vegetables. The project encompasses data collection considerations (though the dataset for this version was pre-existing), model training, and frontend development to create an interactive user experience.

## Created by
Furqan Khan

## License
This project is currently not licensed. Consider adding an MIT License if it's intended to be open source.
You can create an `LICENSE` file with the following content for an MIT license:
```
MIT License

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
```