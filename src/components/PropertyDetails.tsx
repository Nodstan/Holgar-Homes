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
          <h2 className="text-2xl font-bold">Property Not Found</h2>
          <button onClick={() => navigate('/properties')} className="mt-4 text-[#C5A059]">
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
              <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800" className="w-full h-full object-cover" alt="Interior" />
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800" className="w-full h-full object-cover" alt="Interior" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer">
                View All
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          
          {/* LEFT SIDE (70% width on desktop) */}
          <div className="w-full lg:w-[65%]">
            <div className="mb-4">
              <span className="bg-[#C5A059]/10 text-[#C5A059] px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                {property.tag}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-serif leading-tight">
              {property.title}
            </h1>
            
            <div className="flex items-center gap-2 text-slate-500 mb-8">
              <MapPin size={18} className="text-[#C5A059]" />
              <span className="text-base md:text-lg">{property.location}</span>
            </div>

            {/* STATS - Using flex-wrap to prevent horizontal overflow */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-gray-100 mb-8">
              <div className="flex flex-col min-w-[80px]">
                <span className="text-slate-400 text-[9px] uppercase font-black">Beds</span>
                <span className="text-lg font-bold flex items-center gap-2 mt-1">
                  <BedDouble size={20} className="text-[#C5A059]" /> {property.beds}
                </span>
              </div>
              <div className="flex flex-col min-w-[80px]">
                <span className="text-slate-400 text-[9px] uppercase font-black">Baths</span>
                <span className="text-lg font-bold flex items-center gap-2 mt-1">
                  <Bath size={20} className="text-[#C5A059]" /> {property.baths}
                </span>
              </div>
              <div className="flex flex-col min-w-[80px]">
                <span className="text-slate-400 text-[9px] uppercase font-black">Space</span>
                <span className="text-lg font-bold flex items-center gap-1 mt-1">
                  <Maximize size={20} className="text-[#C5A059]" /> 5.2k <small className="text-[10px]">sqft</small>
                </span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 font-serif">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {property.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl">
              {['Smart Home', 'Pool', 'Cinema', 'Security', 'Gym'].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-slate-700 font-semibold text-xs">
                  <CheckCircle2 size={16} className="text-[#C5A059]" /> {feat}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (Contact Card) */}
          <div className="w-full lg:w-[35%]">
            <div className="lg:sticky lg:top-32 bg-slate-900 p-6 md:p-8 rounded-[2rem] text-white shadow-xl">
              <div className="mb-6">
                <p className="text-slate-400 text-xs mb-1">Asking Price</p>
                <h2 className="text-3xl font-bold text-[#C5A059] font-serif">{property.price}</h2>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-[#C5A059] py-4 rounded-xl font-bold uppercase text-xs tracking-widest active:scale-95 transition-all">
                  Book A Tour
                </button>
                <button className="w-full bg-white/10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 border border-white/10">
                  <MessageSquare size={16} /> WhatsApp Agent
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center font-bold">VH</div>
                <div className="text-xs">
                  <p className="font-bold">Hogar Homes Ltd</p>
                  <p className="text-slate-400 uppercase tracking-widest text-[8px]">Verified Agency</p>
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