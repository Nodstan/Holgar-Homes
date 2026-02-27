import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset link
    console.log('Reset link requested for:', email);
    setIsSent(true);
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

        {/* Forgot Password Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl">
          {!isSent ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-2">Reset Password</h2>
                <p className="text-gray-400 text-sm">Enter your email and we'll send you a link to reset your password.</p>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#C5A059] hover:bg-[#b38f4a] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Send Reset Link
                  <ArrowRight size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A059]">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl font-serif text-white mb-3">Check your email</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                We have sent a password recovery link to <span className="text-white font-medium">{email}</span>.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-[#C5A059] hover:text-[#b38f4a] text-sm font-semibold transition-colors flex items-center gap-2 mx-auto"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          )}

          {/* Navigation Link */}
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
            <Link to="/" className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm">
              <Home size={16} />
              Back to Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
