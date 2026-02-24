import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BedDouble, Bath, MapPin, Share2, Heart, 
  ArrowLeft, CheckCircle2, MessageSquare, Maximize 
} from 'lucide-react';
// This pulls from YOUR data file
import { MOCK_PROPERTIES } from '../data/properties'; 

const PropertyDetails: React.FC = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const navigate = useNavigate();

  // Find the specific property in YOUR data
  const property = MOCK_PROPERTIES.find(p => p.id === Number(id));

  // Auto-scroll to top when the page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // If the user types a wrong ID in the URL, show this
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="bg-white min-h-screen pb-20 pt-28">
      {/* 1. TOP ACTION BAR */}
      <div className="max-w-[1440px] mx-auto px-6 mb-8 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} // Takes you back to exactly where you were
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Listings
        </button>
        <div className="flex gap-3">
          <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-all">
            <Share2 size={18} className="text-slate-600" />
          </button>
          <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-all">
            <Heart size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* 2. IMAGE GALLERY */}
      <div className="max-w-[1440px] mx-auto px-6 mb-12">
        <div className="grid grid-cols-12 gap-4 h-[500px] md:h-[600px]">
          <div className="col-span-12 md:col-span-8 h-full overflow-hidden rounded-3xl shadow-lg">
            <img 
              src={property.image} 
              className="w-full h-full object-cover" 
              alt={property.title} 
            />
          </div>
          <div className="hidden md:grid col-span-4 grid-rows-2 gap-4 h-full">
            <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e" className="w-full h-full object-cover" alt="Interior" />
            </div>
            <div className="bg-gray-100 rounded-3xl overflow-hidden relative shadow-sm">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" className="w-full h-full object-cover" alt="Interior" />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white font-bold text-lg">
                View All Photos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT SECTION */}
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-12 gap-12">
        
        {/* Left Side: Information */}
        <div className="col-span-12 lg:col-span-8">
          <div className="mb-6">
            <span className="bg-[#C5A059]/10 text-[#C5A059] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
              {property.tag}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif leading-tight">
            {property.title}
          </h1>
          
          <div className="flex items-center gap-2 text-slate-500 mb-10">
            <MapPin size={20} className="text-[#C5A059]" />
            <span className="text-xl">{property.location}</span>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-10 py-8 border-y border-gray-100 mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-tighter font-black">Bedrooms</span>
              <div className="flex items-center gap-2 text-xl font-bold">
                <BedDouble className="text-[#C5A059]" size={24} /> {property.beds}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-tighter font-black">Bathrooms</span>
              <div className="flex items-center gap-2 text-xl font-bold">
                <Bath className="text-[#C5A059]" size={24} /> {property.baths}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-tighter font-black">Living Space</span>
              <div className="flex items-center gap-2 text-xl font-bold">
                <Maximize className="text-[#C5A059]" size={24} /> 5,200 <span className="text-xs">SQFT</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 font-serif text-slate-900">The Experience</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {property.desc}
            </p>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 bg-slate-50 p-8 rounded-3xl">
            {['Smart Home', 'Infinity Pool', 'Home Cinema', 'Elevator', '24/7 Security', 'Gym Room'].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                <CheckCircle2 size={20} className="text-[#C5A059]" /> {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Price & Contact Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-32 bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl border border-white/5">
            <div className="mb-8">
              <span className="text-slate-400 text-sm block mb-1 font-medium">Acquisition Price</span>
              <h2 className="text-4xl font-bold text-[#C5A059] font-serif">{property.price}</h2>
            </div>
            
            <div className="space-y-4 mb-8">
              <button className="w-full bg-[#C5A059] hover:bg-[#b38f4a] text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95">
                Request Private Tour
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/10">
                <MessageSquare size={18} /> Chat with Agent
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#C5A059] to-[#dfc085] rounded-full flex items-center justify-center font-bold text-white shadow-inner">
                VH
              </div>
              <div>
                <p className="text-sm font-bold">Hogar Homes Nigeria</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Luxury Division</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;