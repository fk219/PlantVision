import React, { useState, useRef, useEffect } from 'react';
import { Upload, Loader2, CheckCircle, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Define the API URL as a variable for easy updates
const API_URL = 'https://localhost:5000/predict';

const Predict = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image data URL
  const [uploadedFile, setUploadedFile] = useState(null); // State to hold the file object
  const [prediction, setPrediction] = useState(null); // State to hold the prediction result
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to hold any errors
  const uploadRef = useRef(null); // Ref for the upload container animation
  const resultRef = useRef(null); // Ref for the result container animation
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Register GSAP ScrollTrigger and set up entrance animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (uploadRef.current) {
      gsap.fromTo(
        uploadRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file); // Store the file object
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Set the image data URL for preview
        setPrediction(null); // Clear previous prediction
        setError(null); // Clear previous errors
        if (uploadRef.current && uploadRef.current.querySelector('.preview-image')) {
          gsap.fromTo(
            uploadRef.current.querySelector('.preview-image'),
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle prediction request to the backend
  const handlePredict = async () => {
    if (!selectedImage) {
      setError('No image selected. Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (!uploadedFile) {
        throw new Error('No file available for prediction. Please re-upload the image.');
      }
      formData.append('file', uploadedFile); // Use the stored file object

      console.log('Sending request to:', API_URL);
      console.log('FormData content:', Object.fromEntries(formData)); // Limited logging

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Prediction request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.prediction && typeof data.confidence !== 'undefined') {
        setPrediction({
          name: data.prediction,
          confidence: (data.confidence * 100).toFixed(1), // Convert to 0-100% scale
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      setError(`Prediction failed: ${error.message}`);
      setPrediction({ name: 'Error', confidence: 0 });
    } finally {
      setIsLoading(false);

      if (resultRef.current) {
        gsap.fromTo(
          resultRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
      }
    }
  };

  // Trigger file input click programmatically
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Plant Identification
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a vegetable image and let our AI identify it with precision in seconds.
          </p>
        </div>

        <div
          ref={uploadRef}
          className="upload-container bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 sm:p-12 text-center hover:border-green-400 transition-colors duration-300">
            {selectedImage ? (
              <div className="space-y-6">
                <img
                  src={selectedImage}
                  alt="Selected vegetable"
                  className="preview-image max-w-full max-h-64 mx-auto rounded-xl shadow-md object-cover"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setUploadedFile(null); // Clear the file object
                    setPrediction(null);
                    setError(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-300 text-sm font-medium"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Drag & Drop or Click to Upload
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Supported formats: JPG, PNG, WebP (Max: 10MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={triggerFileInput}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Choose Image
                </button>
              </div>
            )}
          </div>
        </div>

        {selectedImage && (
          <div className="text-center mb-8">
            <button
              onClick={handlePredict}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 mx-auto px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Identify Plant'
              )}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold text-sm sm:text-base">
              AI is analyzing your image...
            </p>
          </div>
        )}

        {error && (
          <div
            ref={resultRef}
            className="bg-red-500 rounded-2xl shadow-xl p-6 sm:p-8 text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <X className="w-12 h-12 sm:w-16 sm:h-16 text-red-200" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              Error!
            </h2>
            <p className="text-center text-red-100 text-base sm:text-lg">
              {error}
            </p>
            <div className="mt-6 bg-white/20 rounded-xl p-4">
              <p className="text-center text-red-100 text-sm sm:text-base">
                There was an issue processing your request. Please try again.
              </p>
            </div>
          </div>
        )}

        {prediction && !error && (
          <div
            ref={resultRef}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-200" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              This is a {prediction.name}!
            </h2>
            <p className="text-center text-green-100 text-base sm:text-lg">
              Confidence: {prediction.confidence}%
            </p>
            <div className="mt-6 bg-white/20 rounded-xl p-4">
              <p className="text-center text-green-100 text-sm sm:text-base">
                Our AI model is {prediction.confidence}% confident in this identification based on advanced image analysis.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;

