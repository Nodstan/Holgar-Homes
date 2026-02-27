import React, { useState, useMemo, useEffect } from 'react';
import { Search, BedDouble, Bath, ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PROPERTIES, type Property } from '../data/properties'; 
import { Link } from 'react-router-dom'; 

// 1. SKELETON COMPONENT
const PropertySkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
    <div className="h-64 bg-gray-100 animate-pulse" />
    <div className="p-6 space-y-4">
      <div className="h-4 w-1/4 bg-gray-50 rounded animate-pulse" />
      <div className="h-6 w-3/4 bg-gray-50 rounded animate-pulse" />
      <div className="h-4 w-full bg-gray-50 rounded animate-pulse" />
      <div className="flex justify-between pt-4">
        <div className="h-4 w-1/4 bg-gray-50 rounded animate-pulse" />
        <div className="h-4 w-1/4 bg-gray-50 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

interface PropertyListingsProps {
  onViewDetails: (property: Property) => void; 
}

const ITEMS_PER_PAGE = 6;

const PropertyListings: React.FC<PropertyListingsProps> = ({ onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [beds, setBeds] = useState('All');

  const filteredData = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = propertyType === 'All' || p.type === propertyType;
      const matchesBeds = beds === 'All' || p.beds >= parseInt(beds);
      const matchesPrice = p.priceNumeric >= minPrice;
      return matchesSearch && matchesType && matchesBeds && matchesPrice;
    });
  }, [searchQuery, propertyType, beds, minPrice]);

  const handleClearFilters = () => {
    setIsLoading(true);
    setSearchQuery('');
    setPropertyType('All');
    setBeds('All');
    setMinPrice(0);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 500);
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, propertyType]);
  
  return (
    <div className="w-full bg-[#fafafa] pt-20">
      {/* 1. STICKY FILTER BAR - Positioned to sit under the fixed Layout Nav */}
     <section 
  className="sticky w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 z-40 shadow-sm transition-all duration-500 top-20"
>
  <div className="max-w-[1440px] mx-auto px-4 md:px-6">
    {/* Grid setup: 1 column on mobile, 12 on desktop */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
      
      {/* SEARCH INPUT - Full width on mobile, 4 cols on desktop */}
      <div className="relative md:col-span-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          value={searchQuery}
          placeholder="Search Lekki, Mansion..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-luxury-gold transition-all outline-none"
          onChange={(e) => { setIsLoading(true); setSearchQuery(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* MOBILE SCROLL WRAPPER - This is the secret sauce */}
      {/* On mobile, filters stay in one row that you can swipe left/right */}
      <div className="flex md:grid md:grid-cols-8 md:col-span-8 gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        
        <select 
          value={propertyType}
          className="min-w-[120px] md:col-span-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:border-luxury-gold focus:border-luxury-gold focus:bg-white transition-all cursor-pointer shadow-sm appearance-none"
          onChange={(e) => { setIsLoading(true); setPropertyType(e.target.value); setCurrentPage(1); }}
        >
          <option value="All">All Types</option>
          <option value="Duplex">Duplex</option>
          <option value="Apartment">Apartment</option>
          <option value="Mansion">Mansion</option>
        </select>

        <select 
          value={beds}
          className="min-w-[120px] md:col-span-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:border-luxury-gold focus:border-luxury-gold focus:bg-white transition-all cursor-pointer shadow-sm appearance-none"
          onChange={(e) => { setIsLoading(true); setBeds(e.target.value); setCurrentPage(1); }}
        >
          <option value="All">Any Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
          <option value="5">5+ Beds</option>
        </select>

        <select 
          value={minPrice}
          className="min-w-[120px] md:col-span-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-slate-700 outline-none hover:border-luxury-gold focus:border-luxury-gold focus:bg-white transition-all cursor-pointer shadow-sm appearance-none"
          onChange={(e) => { setIsLoading(true); setMinPrice(Number(e.target.value)); setCurrentPage(1); }}
        >
          <option value="0">Any Price</option>
          <option value="100">Above ₦100M</option>
          <option value="200">Above ₦200M</option>
          <option value="400">Above ₦400M</option>
        </select>

        <button 
          onClick={handleClearFilters}
          className="min-w-[100px] md:col-span-2 flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all active:scale-95 group"
        >
          <svg 
            className="group-active:rotate-180 transition-transform duration-500" 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  </div>
    </section>

      {/* 2. MAIN CONTENT GRID */}
      <main className="max-w-[1440px] mx-auto px-6 py-10 pt-24">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 font-serif">Exclusive <span className="text-luxury-gold">Listings</span></h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Displaying {filteredData.length} premium properties in Nigeria</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
          {isLoading ? (
            [...Array(6)].map((_, i) => <PropertySkeleton key={i} />)
          ) : (
            paginatedData.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-60 md:h-72 overflow-hidden bg-gray-100">
                  <img 
                    src={`${item.image}?auto=format&fit=crop&w=800&q=80`} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={item.title} 
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-luxury-gold text-white text-[9px] md:text-[10px] font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-lg font-bold text-slate-900 text-sm md:text-base">
                    {item.price}
                  </div>
                </div>

                <div className="p-5 md:p-8">
                  <div className="flex items-center gap-1 text-luxury-gold text-[9px] md:text-[10px] font-bold mb-2 md:mb-3 uppercase tracking-widest">
                    <MapPin size={12} className="md:w-3.5 md:h-3.5" /> {item.location}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900 group-hover:text-luxury-gold transition-colors font-serif line-clamp-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2 mb-6 md:mb-8">{item.desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100">
                    <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1.5 md:gap-2"><BedDouble size={16} className="md:w-4.5 md:h-4.5 text-luxury-gold" /> {item.beds}</span>
                      <span className="flex items-center gap-1.5 md:gap-2"><Bath size={16} className="md:w-4.5 md:h-4.5 text-luxury-gold" /> {item.baths}</span>
                    </div>
                    <Link to={`/property/${item.id}`}>
                      <button className="text-slate-900 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 md:gap-2 hover:text-luxury-gold transition-all">
                        View Suite <ArrowUpRight size={14} className="md:w-4 md:h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 3. PAGINATION */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-4 border border-gray-200 rounded-full disabled:opacity-20 hover:border-luxury-gold hover:text-luxury-gold transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i}
                onClick={() => { setIsLoading(true); setCurrentPage(i + 1); }}
                className={`w-14 h-14 rounded-full text-sm font-bold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-luxury-gold text-white shadow-xl shadow-luxury-gold/20' 
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-4 border border-gray-200 rounded-full disabled:opacity-20 hover:border-luxury-gold hover:text-luxury-gold transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertyListings;