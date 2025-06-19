import React, { useRef, useEffect } from 'react';
import { Camera, Zap, Brain, Target, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current.querySelector('.hero-title'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        heroRef.current.querySelector('.hero-subtitle'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        heroRef.current.querySelector('.hero-button'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

    // Features section animations
    gsap.fromTo(
      featureCardRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Recognition',
      description: 'Advanced deep learning algorithms trained on thousands of vegetable images for maximum accuracy.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant identification results in under 2 seconds with our optimized neural network.'
    },
    {
      icon: Target,
      title: '90%+ Accuracy',
      description: 'State-of-the-art CNN model ensures precise identification across 50+ vegetable varieties.'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Access our plant identification service anytime, anywhere with just a simple photo upload.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl transform -translate-y-1/2 opacity-50"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative z-10">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Identify
                </span>
                <br />
                <span className="text-gray-800">Plants with AI</span>
              </h1>

              <p className="hero-subtitle text-base sm:text-lg md:text-xl text-gray-600 mt-4 sm:mt-6 leading-relaxed max-w-lg">
                Revolutionary machine learning technology that identifies vegetables instantly. Simply upload a photo and let our AI do the magic.
              </p>

              <NavLink
                to="/predict"
                className="hero-button inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg mt-6 sm:mt-8 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Start Identifying
              </NavLink>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 sm:p-8 flex items-center justify-center h-56 sm:h-64 lg:h-80">
                  <div className="text-center">
                    <Camera className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-4" />
                    <p className="text-green-700 font-semibold text-sm sm:text-base">Upload your plant image here</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Plant Vision?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge technology combines artificial intelligence with user-friendly design to deliver the most accurate plant identification system.
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={el => (featureCardRefs.current[index] = el)}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;