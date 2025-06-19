import React, { useEffect, useRef } from 'react';
import { Leaf, Mail, Shield, FileText } from 'lucide-react';
import { gsap } from 'gsap';
import logo from '../assets/logo.png'


const Footer = () => {
  const footerRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    // GSAP animation for footer
    gsap.fromTo(
      footerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // Staggered animation for links
    gsap.fromTo(
      linkRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 1 }
    );
  }, []);

  const features = ['AI Recognition', 'Instant Results', 'High Accuracy', 'Easy Upload'];
  const technologies = ['Deep Learning', 'Computer Vision', 'Neural Networks', 'Image Processing'];

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                <Leaf className="w-6 h-6 text-white" />
                <img src={logo} alt="Logo" className='w-6 h-6'/>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Plant Vision
              </h3>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              Harnessing AI to identify vegetables instantly with cutting-edge machine learning technology for plant enthusiasts worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-green-300">Features</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              {features.map(feature => (
                <li key={feature} className="hover:text-green-400 transition-colors duration-200">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-green-300">Technology</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
              {technologies.map(tech => (
                <li key={tech} className="hover:text-green-400 transition-colors duration-200">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Plant Vision | All rights reserved.</p> 
          <p>Crafted with ❤️ by Furqan Khan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;