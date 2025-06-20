import React, { useRef, useEffect, useState } from 'react';
import { Brain, Target, Zap, Clock, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const aboutRef = useRef(null);
  const sectionRefs = useRef([]);
  const [prediction, setPrediction] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const classes = [
    "Apple", "Banana", "Beetroot", "Bell Pepper", "Cabbage",
    "Capsicum", "Carrot", "Cauliflower", "Chilli pepper", "Corn",
    "Cucumber", "Eggplant", "Garlic", "Ginger", "Grapes", "Jalepeno",
    "Kiwi", "Lemon", "Lettuce", "Mango", "Onion", "Orange", "Paprika",
    "Pear", "Peas", "Pineapple", "Pomegranate", "Potato", "Raddish",
    "Soy beans", "Spinach", "Sweetcorn", "Sweetpotato", "Tomato", "Turnip", "Watermelon"
  ];

  const stats = [
    { value: '82.7%', label: 'Model Accuracy', color: 'green-600' },
    { value: '<2s', label: 'Processing Time', color: 'blue-600' },
    { value: `${classes.length}`, label: 'Vegetable & Fruit Types', color: 'purple-600' }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered entrance animation for sections
    gsap.fromTo(
      sectionRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      }
    );

    // Load model
    const loadModel = async () => {
      try {
        const model = await window.tf.loadLayersModel('/best_model.h5');
        console.log('Model loaded successfully.');
        window.model = model;
      } catch (err) {
        console.error('Failed to load model:', err);
      }
    };

    loadModel();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const predictImage = async (img) => {
    if (!window.model) {
      alert("Model is not loaded yet.");
      return;
    }

    const tensor = window.tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([64, 64])
      .toFloat()
      .div(window.tf.scalar(255))
      .expandDims();

    const predictions = await window.model.predict(tensor).data();
    const predictedClassIndex = predictions.indexOf(Math.max(...predictions));
    setPrediction(classes[predictedClassIndex]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => predictImage(img);
      img.src = event.target.result;
      setPreview(img.src);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div ref={aboutRef} className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div ref={el => (sectionRefs.current[0] = el)} className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            About Plant Vision
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">Discover how this AI-powered plant identifier works and learn about the journey behind it.</p>
        </div>

        {/* Project Overview */}
        <div ref={el => (sectionRefs.current[1] = el)} className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
            Project Overview
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Plant Vision is a personal project I developed entirely on my own. It uses a custom convolutional neural network (CNN) trained on a dataset of fruits and vegetables.
            The model was built using TensorFlow/Keras, with data augmentation techniques such as random rotation, flip, and zoom applied during training. It supports classification across 36 different plant types.
          </p>
        </div>

        {/* Model Architecture */}
        <div ref={el => (sectionRefs.current[2] = el)} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
            <Target className="w-5 h-5 sm:w-6 sm:h-6" />
            Model Architecture
          </h3>
          <p className="leading-relaxed text-sm sm:text-base">
            The CNN model consists of:
            <ul className="list-disc ml-5 mt-2">
              <li>2 convolutional blocks with MaxPooling and Dropout layers</li>
              <li>Flattened output fed into dense layers</li>
              <li>Dense layer with 512 units followed by another dense layer with 256 units</li>
              <li>Dropout rates of 0.25 and 0.5 used for regularization</li>
              <li>Final softmax layer for 36-class classification</li>
            </ul>
            Total trainable parameters: ~6.6 million. Optimizer used: Adam. Loss function: Categorical Crossentropy.
          </p>
        </div>

        {/* Training Process */}
        <div ref={el => (sectionRefs.current[3] = el)} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            Training Process
          </h3>
          <p className="leading-relaxed text-sm sm:text-base">
            The model was trained for 50 epochs using a batch size of 32 and early stopping (patience=5) to prevent overfitting. Data augmentation techniques like horizontal flip, rotation, and zoom were applied to enhance generalization.
            Validation accuracy reached <strong>82.6%</strong> after training, while test accuracy was <strong>82.7%</strong>.
            Model checkpointing ensured saving only the best weights during training.
          </p>
        </div>

        {/* Technical Specs */}
        <div ref={el => (sectionRefs.current[4] = el)} className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
                <div className={`text-xl sm:text-2xl md:text-3xl font-bold text-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Profile */}
        <div ref={el => (sectionRefs.current[5] = el)} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
            <Info className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-400" />
            Developer Profile
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            This project was developed entirely solo — from preprocessing the images, designing and training the model, to deploying the web interface. No pre-trained models or external help was used.
            Tools include: TensorFlow/Keras for deep learning, React.js + TailwindCSS for frontend, and complete end-to-end implementation without any third-party ML pipelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
