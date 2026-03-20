import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Instagram, Linkedin, MapPin, ArrowRight } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  return (
    <div className="min-h-screen flex flex-col bg-brand-gray font-sans text-brand-charcoal selection:bg-brand-gold/30 overflow-x-hidden">
      {/* Navigation - Solid Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy border-b border-white/5 shadow-2xl">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group z-[70] shrink-0">
              <img src="/WhiteLogo.svg" alt="Hogar Homes Icon" className="h-10 md:h-12 w-auto object-contain" />
              <span className="text-brand-gold text-xl md:text-2xl font-sans tracking-[0.15em] mt-1 uppercase">
                Hogar homes
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <Link to="/" className="text-gray-300 hover:text-brand-gold transition-colors text-xs uppercase tracking-[0.2em] font-medium">Home</Link>
              <Link to="/properties" className="text-gray-300 hover:text-brand-gold transition-colors text-xs uppercase tracking-[0.2em] font-medium">Properties</Link>
              <Link to="/services" className="text-gray-300 hover:text-brand-gold transition-colors text-xs uppercase tracking-[0.2em] font-medium">Services</Link>
              <Link to="/about" className="text-gray-300 hover:text-brand-gold transition-colors text-xs uppercase tracking-[0.2em] font-medium">About</Link>
              <a href="#contact" className="text-gray-300 hover:text-brand-gold transition-colors text-xs uppercase tracking-[0.2em] font-medium">Contact</a>

              <button className="bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg active:scale-95 ml-4">
                Book a Viewing
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center z-[70]">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white" aria-label="Toggle Menu">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-brand-navy z-[65] flex flex-col md:hidden"
            >
              <div className="flex flex-col h-full pt-32 pb-12 px-10">
                <nav className="space-y-10 mb-12">
                  <Link to="/" className="block text-4xl text-white tracking-widest">Home</Link>
                  <Link to="/properties" className="block text-4xl text-white tracking-widest">Properties</Link>
                  <Link to="/services" className="block text-4xl text-white tracking-widest">Services</Link>
                  <Link to="/about" className="block text-4xl text-white tracking-widest">About</Link>
                </nav>
                <div className="mt-auto border-t border-white/10 pt-10">
                   <button className="w-full bg-brand-gold text-white py-5 px-6 text-xs uppercase tracking-widest font-bold flex justify-between items-center">
                    <span>Book a Viewing</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy text-white border-t border-white/10 pt-20 pb-10 mt-auto">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <img src="/WhiteLogo.svg" alt="Hogar Homes" className="h-10 w-auto opacity-90" />
                <span className="text-brand-gold text-xl font-sans tracking-[0.15em]">Hogar homes</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                Curating Nigeria's most exceptional properties for an elite clientele. Experience luxury living redefined.
              </p>
              <div className="flex space-x-5">
                <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/properties" className="hover:text-white transition-colors">Exclusive Listings</Link></li>
                <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">Contact</h4>
              <ul className="space-y-6 text-sm text-gray-400">
                <li className="flex items-start gap-3 italic">
                  <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>14 Eko Pearl Tower, Eko Atlantic City, Lagos</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-gold shrink-0" />
                  <span>+234-806-235-3099</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">Newsletter</h4>
              <form className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 border border-white/10 px-4 py-4 text-xs focus:outline-none focus:border-brand-gold text-white tracking-widest"
                />
                <button type="button" className="bg-brand-gold hover:bg-brand-gold-hover text-white font-bold py-4 text-xs uppercase tracking-widest transition-colors shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Hogar Homes Nigeria. All rights reserved.
            </p>
            <div className="flex space-x-8 items-center">
              <Link to="/login" className="hover:text-white transition-colors">Admin Portal</Link>
              <span className="text-white/10">|</span>
              <span className="text-gray-600 italic uppercase">Excellence in Real Estate</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}