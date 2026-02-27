import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic logic: redirect to admin dashboard
    console.log('Logging in with:', { email, password, rememberMe });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-[#C5A059]/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C5A059]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C5A059]/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        {/* Brand Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-[#C5A059] p-2 rounded-sm group-hover:bg-[#b38f4a] transition-colors shadow-lg">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm opacity-50"></div>
                <div className="w-2 h-2 bg-white rounded-sm opacity-80"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight font-serif text-white">
              Hogar<span className="text-[#C5A059]"> Homes</span>
            </h1>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-white mb-2">Admin Login</h2>
            <p className="text-gray-400 text-sm">Welcome back. Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#C5A059] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-white pl-11 pr-4 py-3 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 transition-all rounded-sm placeholder:text-gray-600"
                  placeholder="admin@hogarhomes.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#C5A059] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-white pl-11 pr-4 py-3 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 transition-all rounded-sm placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 border border-white/20 rounded-sm peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-[#C5A059] hover:text-[#b38f4a] font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#C5A059] hover:bg-[#b38f4a] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm">
              <Home size={16} />
              Back to Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
