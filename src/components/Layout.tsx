import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Instagram, Linkedin, MapPin, Moon, ChevronUp, ArrowRight } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isDarkNav = true; // Global dark luxury header for consistency

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-[#C5A059]/30 overflow-x-hidden">
      {/* Navigation - Always Fixed */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-0' 
            : 'bg-slate-900 border-b border-white/5 py-1 md:py-2'
        }`}>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${
              isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
            }`}>
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-1.5 md:gap-2 cursor-pointer group z-[70] shrink-0">
              <div className="bg-[#C5A059] p-1.5 md:p-2 rounded-sm group-hover:bg-[#b38f4a] transition-colors">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-sm opacity-50"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-sm opacity-80"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <h1 className="text-sm md:text-xl font-bold tracking-tight font-serif whitespace-nowrap text-white">
                Hogar<span className="text-[#C5A059]"> Homes</span>
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${isDarkNav ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                Home
              </Link>
              <Link to="/properties" className={`${isDarkNav ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                Properties
              </Link>
              <a href="#services" className={`${isDarkNav ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                Services
              </a>
              <a href="#about" className={`${isDarkNav ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                About
              </a>
              
              <div className="flex items-center gap-4 ml-4">
                <button className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-6 py-2.5 text-sm uppercase tracking-widest font-bold transition-all shadow-sm active:scale-95">
                  Book a Viewing
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center z-[70]">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`p-2 rounded-sm transition-colors ${
                  isDarkNav ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-gray-100'
                }`}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Luxury Overlay Style */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-slate-900 z-[65] flex flex-col md:hidden"
            >
              <div className="flex flex-col h-full pt-28 pb-12 px-8 overflow-y-auto">
                <nav className="space-y-8 mb-12">
                  <Link 
                    to="/" 
                    className="block text-4xl font-serif text-white hover:text-[#C5A059] transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/properties" 
                    className="block text-4xl font-serif text-white hover:text-[#C5A059] transition-colors"
                  >
                    Properties
                  </Link>
                  <a 
                    href="#services" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-4xl font-serif text-white hover:text-[#C5A059] transition-colors"
                  >
                    Services
                  </a>
                  <a 
                    href="#about" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-4xl font-serif text-white hover:text-[#C5A059] transition-colors"
                  >
                    About
                  </a>
                  <Link 
                    to="/login" 
                    className="block text-2xl font-serif text-gray-400 hover:text-[#C5A059] transition-colors"
                  >
                    Admin Portal
                  </Link>
                </nav>

                <div className="mt-auto space-y-8">
                  <div className="space-y-4">
                    <p className="text-[#C5A059] uppercase tracking-widest text-xs font-bold">Inquiries</p>
                    <a href="tel:+234800HOGAR" className="block text-xl text-white">+234 (0) 800 HOGAR</a>
                    <a href="mailto:concierge@hogarhomes.com" className="block text-xl text-white">concierge@hogarhomes.com</a>
                  </div>
                  
                  <button className="w-full bg-[#C5A059] text-white py-5 px-6 rounded-sm text-sm uppercase tracking-widest font-bold flex justify-between items-center group">
                    <span>Book a Viewing</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer remains largely the same but with #C5A059 accents */}
      <footer className="bg-slate-900 text-white border-t border-white/10 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#C5A059] p-1.5 rounded-sm">
                   <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm opacity-50"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm opacity-80"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="font-serif text-2xl tracking-wide">Hogar Homes</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Curating Nigeria's most exceptional properties for an elite clientele. Experience luxury living redefined.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-[#C5A059] transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6 text-[#C5A059]">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/properties" className="hover:text-white transition-colors">Exclusive Listings</Link></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6 text-[#C5A059]">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>14 Eko Pearl Tower, Eko Atlantic City, Lagos</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#C5A059] flex-shrink-0" />
                  <span>+234 (0) 800 HOGAR</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6 text-[#C5A059]">Newsletter</h4>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] text-white"
                />
                <button type="button" className="bg-[#C5A059] hover:bg-[#b38f4a] text-white font-bold px-4 py-3 text-sm uppercase tracking-widest transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Hogar Homes Nigeria. All rights reserved.</p>
            <div className="flex space-x-6 items-center">
              <Link to="/login" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      {/* {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#C5A059] hover:bg-[#b38f4a] text-white p-3 rounded-full shadow-lg transition-all active:scale-95"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )} */}
    </div>
  );
}