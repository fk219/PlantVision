import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Camera, Leaf, Home, Info, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import logo from '../assets/logo.png'

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // GSAP animation for navbar on mount
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const navLinks = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'predict', path: '/predict', label: 'Predict', icon: Camera },
    { id: 'about', path: '/about', label: 'About', icon: Info }
  ];

  return (
    <nav ref={navRef} className="bg-white/90 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              {/* <Leaf className="w-6 h-6 text-white" /> */}
              <img src={logo} alt="Logo" className='w-6 h-6'/>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Plant Vision
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <div className="flex gap-2 lg:gap-4">
              {navLinks.map(({ id, path, label, icon: Icon }) => (
                <NavLink
                  key={id}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-green-100 text-green-700 shadow-sm'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  {label}
                </NavLink>
              ))}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-green-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            {navLinks.map(({ id, path, label, icon: Icon }) => (
              <NavLink
                key={id}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;