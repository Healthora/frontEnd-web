import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Menu, X, ArrowRight } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Function
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Problème", href: "#ProblemsSectionMedical" },
    { name: "Solution", href: "#SolutionsSectionMedical" },
    { name: "Fonctionnement", href: "#HowItWorksSection" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-sky-200">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
              Medeli<span className="text-sky-600">RDV</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-4 py-2 text-gray-600 hover:text-sky-600 text-sm font-semibold rounded-lg hover:bg-sky-50 transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sky-500 group-hover:w-1/2 transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated() ? (
              <Link
                to="/dashboard"
                className="group relative px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full font-bold text-sm text-white shadow-xl shadow-sky-200 hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Tableau de Bord
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-5 py-2.5 text-gray-700 hover:text-sky-600 font-bold text-sm transition-all duration-200"
                >
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  className="group relative px-6 py-2.5 bg-gray-900 rounded-full font-bold text-sm text-white shadow-xl shadow-gray-200 hover:bg-sky-600 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Essai Gratuit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-sky-600 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block px-4 py-3 text-gray-600 hover:text-sky-600 text-base font-bold rounded-xl hover:bg-sky-50 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 space-y-3 border-t border-gray-100">
              {isAuthenticated() ? (
                <Link
                  to="/dashboard"
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-sm text-white shadow-lg shadow-sky-100 transition-all"
                >
                  Tableau de Bord
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 text-center bg-sky-600 rounded-xl font-bold text-sm text-white shadow-lg shadow-sky-100 transition-all"
                >
                  S'inscrire Gratuitement
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;