import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BedDouble, Bath, MapPin, Share2, Heart, 
  ArrowLeft, CheckCircle2, MessageSquare, Maximize 
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties'; 

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-luxury text-brand-navy">Property Not Found</h2>
          <button onClick={() => navigate('/properties')} className="mt-4 text-brand-gold">
            Return to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    // overflow-x-hidden here to kill any horizontal scroll globally
    <div className="bg-white min-h-screen pb-20 pt-24 md:pt-32 overflow-x-hidden">
      
      {/* 1. TOP ACTION BAR */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 mb-6 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold uppercase text-[10px] md:text-xs tracking-widest"
        >
          <ArrowLeft size={18} /> <span>Back</span>
        </button>
        <div className="flex gap-2">
          <button className="p-2.5 border border-gray-100 rounded-full hover:bg-gray-50">
            <Share2 size={18} className="text-slate-600" />
          </button>
          <button className="p-2.5 border border-gray-100 rounded-full hover:bg-gray-50">
            <Heart size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* 2. IMAGE GALLERY */}
      <div className="w-full max-w-[1440px] mx-auto mb-8 md:mb-12 md:px-6">
        {/* Changed to flex-col on mobile to prevent grid blowout */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 h-auto md:h-[600px]">
          <div className="w-full md:col-span-8 h-[300px] sm:h-[400px] md:h-full overflow-hidden md:rounded-3xl shadow-lg">
            <img 
              src={property.image} 
              className="w-full h-full object-cover" 
              alt={property.title} 
            />
          </div>
          <div className="hidden md:grid col-span-4 grid-rows-2 gap-4 h-full">
            <div className="bg-gray-100 rounded-3xl overflow-hidden">
              <img 
                src={property.gallery?.[0] || "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800"} 
                className="w-full h-full object-cover" 
                alt="Interior" 
              />
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden relative group">
              <img 
                src={property.gallery?.[1] || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800"} 
                className="w-full h-full object-cover" 
                alt="Interior" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer">
                View All
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT SIDE (Content) */}
          <div className="lg:col-span-8 space-y-8 pt-4 md:pt-8">
            <div>
              <div className="mb-4">
                <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {property.tag}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4 font-luxury leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={18} className="text-brand-gold" />
                <span className="text-base md:text-lg">{property.location}</span>
              </div>
            </div>

            {/* Mobile Price Card - Visible only on Mobile (below title) */}
            <div className="lg:hidden">
              <div className="bg-brand-navy p-6 rounded-3xl text-white shadow-xl">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Asking Price</p>
                    <h2 className="text-3xl font-bold text-brand-gold font-luxury tracking-widest">{property.price}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Available
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-brand-gold hover:bg-brand-gold-hover py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest active:scale-95 transition-all">
                    Book Tour
                  </button>
                  <button className="bg-white/10 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 border border-white/10">
                    <MessageSquare size={16} /> WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-8 lg:gap-12 py-8 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-brand-gold">
                  <BedDouble size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Bedrooms</span>
                  <span className="text-xl font-bold text-slate-900">{property.beds}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-brand-gold">
                  <Bath size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Bathrooms</span>
                  <span className="text-xl font-bold text-slate-900">{property.baths}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-brand-gold">
                  <Maximize size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Total Area</span>
                  <span className="text-xl font-bold text-slate-900">5,200 <small className="text-xs font-medium text-slate-500 lowercase">sqft</small></span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-luxury text-brand-navy">About this property</h3>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-none">
                {property.desc}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-luxury text-brand-navy">Key Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Smart Home Automation', 'Infinity Pool', 'Private Cinema', '24/7 Elite Security', 'Home Gym', 'Serviced Quarters'].map((feat) => (
                  <div key={feat} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100/50 group hover:border-brand-gold/30 transition-colors">
                    <CheckCircle2 size={20} className="text-brand-gold shrink-0" /> 
                    <span className="text-slate-700 font-semibold text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Sticky Sidebar) */}
          <div className="hidden lg:block lg:col-span-4 pt-4 md:pt-8">
            <div className="sticky top-32 space-y-6">
              <div className="bg-brand-navy p-8 rounded-[2.5rem] text-white shadow-2xl border border-white/5">
                <div className="mb-8">
                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Exclusive Asking Price</p>
                  <h2 className="text-4xl font-bold text-brand-gold font-luxury tracking-widest">{property.price}</h2>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-brand-gold hover:bg-brand-gold-hover py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20">
                    Book A Private Tour
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 border border-white/10 transition-all">
                    <MessageSquare size={18} /> WhatsApp Concierge
                  </button>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-tr from-brand-gold to-[#d4b77b] rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner shadow-white/20">VH</div>
                    <div>
                      <p className="font-bold text-lg leading-tight">Hogar Homes Ltd</p>
                      <p className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-black mt-1">Verified Premium Agency</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed italic">
                    "Our advisors are available 24/7 to facilitate your inquiry with the utmost discretion."
                  </p>
                </div>
              </div>

              {/* Additional Sidebar Info */}
              <div className="bg-brand-navy border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                {/* Subtle decorative glow in the corner */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-gold opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
                
                <h4 className="font-bold text-brand-gold mb-6 uppercase tracking-[0.2em] text-[10px]">
                  Share this property
                </h4>
                
                <div className="flex gap-4">
                  {[Share2, Heart].map((Icon, i) => (
                    <button 
                      key={i} 
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                    >
                      <Icon size={22} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
