import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Phone, Mail, Instagram, Linkedin, MapPin, Moon } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setIsVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPropertiesPage = location.pathname === '/properties';


useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    let isNavVisible = true;

    if (isPropertiesPage) {
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        isNavVisible = false;
      } else {
        isNavVisible = true;
      }
    }

    setIsVisible(isNavVisible);
    setLastScrollY(currentScrollY);

    // DISPATCH CUSTOM EVENT 
    window.dispatchEvent(new CustomEvent('navChange', { detail: isNavVisible }));
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY, isPropertiesPage]);


  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-[#C5A059]/30">
      {/* Navigation - Preserving his fixed/transparent logic */}
        <nav className={`fixed w-full z-50 transition-transform duration-500 ${
            isHome 
              ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10' 
              : 'bg-white border-b border-gray-100'
          } ${visible ? 'translate-y-0' : '-translate-y-full'}`}>

        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section - Your Grid Logo Design */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-[#C5A059] p-2 rounded-sm group-hover:bg-[#b38f4a] transition-colors">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-sm opacity-50"></div>
                  <div className="w-2 h-2 bg-white rounded-sm opacity-80"></div>
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <h1 className={`text-xl font-bold tracking-tight font-serif ${isHome ? 'text-white' : 'text-slate-900'}`}>
                Hogar<span className="text-[#C5A059]"> Homes</span>
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${isHome ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                Home
              </Link>
              <Link to="/properties" className={`${isHome ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                Properties
              </Link>
              <a href="#services" className={`${isHome ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                Services
              </a>
              <a href="#about" className={`${isHome ? 'text-gray-300' : 'text-gray-600'} hover:text-[#C5A059] transition-colors text-sm uppercase tracking-widest font-medium`}>
                About
              </a>
              
              <div className="flex items-center gap-4 ml-4">
                <button className="bg-[#C5A059] hover:bg-[#b38f4a] text-white px-6 py-2.5 text-sm uppercase tracking-widest font-bold transition-all shadow-sm active:scale-95">
                  Book a Viewing
                </button>
                <button className={`p-2 rounded-full border ${isHome ? 'text-gray-400 border-white/10 hover:bg-white/5' : 'text-gray-400 border-gray-100 hover:bg-gray-50'}`}>
                  <Moon size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isHome ? 'text-white' : 'text-slate-900'}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden ${isHome ? 'bg-slate-900 border-t border-white/10' : 'bg-white border-t border-gray-100'}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-3 text-base font-medium ${isHome ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'}`}>Home</Link>
              <Link to="/properties" onClick={() => setIsMenuOpen(false)} className={`block px-3 py-3 text-base font-medium ${isHome ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'}`}>Properties</Link>
              <button className="w-full mt-4 bg-[#C5A059] text-white py-3 uppercase tracking-widest font-bold">Book a Viewing</button>
            </div>
          </motion.div>
        )}
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
              <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}