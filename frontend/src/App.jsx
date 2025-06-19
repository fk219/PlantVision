import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Predict from './pages/Predict';
import About from './pages/About';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Load and register GSAP with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Page transition animation
    gsap.fromTo(
      '.page-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Cleanup ScrollTrigger instances on route change
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;