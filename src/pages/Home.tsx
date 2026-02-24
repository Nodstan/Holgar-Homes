import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Bed, Bath, Square, Search, ChevronDown } from 'lucide-react';
import { properties } from '../data/data';

const services = [
  {
    title: 'Luxury Sales',
    description: 'Exclusive access to off-market properties and premium listings across Nigeria\'s most coveted neighborhoods.',
    icon: <Square className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
  },
  {
    title: 'Market Analysis',
    description: 'Data-driven insights and comprehensive valuations to ensure your investment yields maximum returns.',
    icon: <Search className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
  },
  {
    title: 'Elite Consulting',
    description: 'Bespoke advisory services tailored to high-net-worth individuals and institutional investors.',
    icon: <MapPin className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
  }
];

export default function Home() {
  const [filterType, setFilterType] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [filterBeds, setFilterBeds] = useState('All');

  const filteredProperties = properties.filter(prop => {
    if (filterType !== 'All' && prop.type !== filterType) return false;
    if (filterBeds !== 'All' && prop.beds < parseInt(filterBeds)) return false;
    
    if (filterPrice !== 'All') {
      if (filterPrice === 'Under ₦300M' && prop.priceValue >= 300000000) return false;
      if (filterPrice === '₦300M - ₦600M' && (prop.priceValue < 300000000 || prop.priceValue > 600000000)) return false;
      if (filterPrice === 'Over ₦600M' && prop.priceValue <= 600000000) return false;
    }
    
    return true;
  });

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/ekoatlantic/1920/1080?blur=0" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-blue-600 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium"
          >
            Welcome to Hogar Homes
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white font-serif font-light leading-tight mb-8"
          >
            Luxury Living in <br className="hidden md:block" />
            <span className="italic text-white/90">Eko Atlantic</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#properties" 
              className="inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1 rounded-sm"
            >
              View Properties
            </a>
          </motion.div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Exclusive Listings</h2>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto"></div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-6 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between rounded-sm">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 text-slate-900 py-3 pl-4 pr-10 w-full md:w-48 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 text-slate-900 py-3 pl-4 pr-10 w-full md:w-48 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                >
                  <option value="All">Price Range</option>
                  <option value="Under ₦300M">Under ₦300M</option>
                  <option value="₦300M - ₦600M">₦300M - ₦600M</option>
                  <option value="Over ₦600M">Over ₦600M</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 text-slate-900 py-3 pl-4 pr-10 w-full md:w-48 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  value={filterBeds}
                  onChange={(e) => setFilterBeds(e.target.value)}
                >
                  <option value="All">Bedrooms</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            
            <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-900/90 text-white px-8 py-3 flex items-center justify-center gap-2 transition-colors rounded-sm">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-xs uppercase tracking-wider px-3 py-1">
                    {property.type}
                  </div>
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-2xl font-serif mb-1">{property.price}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                  <div className="flex items-center text-gray-500 mb-4 text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                    {property.location}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4 text-gray-400" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-gray-400" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No properties match your current filters. Please try adjusting your criteria.
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Expertise</h2>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-blue-600 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 translate-x-4 translate-y-4"></div>
                <img 
                  src="https://picsum.photos/seed/voke/600/800?blur=0" 
                  alt="Voke Irekpita" 
                  className="relative z-10 w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <p className="text-blue-600 uppercase tracking-widest text-sm font-medium mb-4">Meet The Founder</p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Voke Irekpita</h2>
              <div className="w-12 h-0.5 bg-blue-600 mb-8"></div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  With over a decade of experience in Nigeria's luxury real estate market, Voke Irekpita has established Hogar Homes as the premier destination for high-net-worth individuals seeking exceptional properties.
                </p>
                <p>
                  Her deep understanding of the Eko Atlantic, Ikoyi, and Victoria Island markets, combined with an unwavering commitment to discretion and excellence, ensures that every client receives unparalleled service.
                </p>
                <p>
                  "Real estate is not just about transactions; it's about curating lifestyles and securing legacies for generations to come."
                </p>
              </div>
              
              <div className="mt-10">
                <img 
                  src="https://picsum.photos/seed/signature/200/80?blur=0" 
                  alt="Signature" 
                  className="h-12 opacity-60 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
