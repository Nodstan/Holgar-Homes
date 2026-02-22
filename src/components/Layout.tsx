import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Phone, Mail, Instagram, Linkedin, MapPin } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isHome ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10' : 'bg-slate-900 border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-sm">
                <span className="font-serif text-slate-900 font-bold text-xl leading-none">H</span>
              </div>
              <span className="font-serif text-white text-2xl tracking-wide">Hogar Homes</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">Home</Link>
              <a href={isHome ? "#properties" : "/#properties"} className="text-gray-300 hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">Properties</a>
              <a href={isHome ? "#services" : "/#services"} className="text-gray-300 hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">Services</a>
              <a href={isHome ? "#about" : "/#about"} className="text-gray-300 hover:text-blue-600 transition-colors text-sm uppercase tracking-widest">About</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-slate-900 px-6 py-2.5 text-sm uppercase tracking-widest font-medium transition-colors">
                Contact Us
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-blue-600">
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
            className="md:hidden bg-slate-900 border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-600 hover:bg-white/5">Home</Link>
              <a href={isHome ? "#properties" : "/#properties"} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-600 hover:bg-white/5">Properties</a>
              <a href={isHome ? "#services" : "/#services"} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-600 hover:bg-white/5">Services</a>
              <a href={isHome ? "#about" : "/#about"} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-600 hover:bg-white/5">About</a>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-white/10 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-sm">
                  <span className="font-serif text-slate-900 font-bold text-xl leading-none">H</span>
                </div>
                <span className="font-serif text-2xl tracking-wide">Hogar Homes</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Curating Nigeria's most exceptional properties for an elite clientele. Experience luxury living redefined.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                <li><a href="/#properties" className="hover:text-blue-600 transition-colors">Exclusive Listings</a></li>
                <li><a href="/#services" className="hover:text-blue-600 transition-colors">Our Services</a></li>
                <li><a href="/#about" className="hover:text-blue-600 transition-colors">About Voke Irekpita</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>14 Eko Pearl Tower,<br />Eko Atlantic City, Lagos</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-600 flex-shrink-0" />
                  <span>+234 (0) 800 HOGAR</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-600 flex-shrink-0" />
                  <span>info@hogarhomesng.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Subscribe to receive exclusive off-market listings.</p>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-white"
                />
                <button type="button" className="bg-blue-600 hover:bg-blue-700 text-slate-900 font-medium px-4 py-3 text-sm uppercase tracking-widest transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Hogar Homes Nigeria. All rights reserved.</p>
            <div className="flex space-x-6 items-center">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
    </div>
  );
}
