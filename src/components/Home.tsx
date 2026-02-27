import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Square, Search, Phone, Mail, BedDouble, Bath, ArrowUpRight } from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';

const services = [
  {
    title: 'Luxury Sales',
    description: 'Exclusive access to off-market properties and premium listings across Nigeria\'s most coveted neighborhoods.',
    icon: <Square className="w-8 h-8 text-luxury-gold" strokeWidth={1.5} />
  },
  {
    title: 'Market Analysis',
    description: 'Data-driven insights and comprehensive valuations to ensure your investment yields maximum returns.',
    icon: <Search className="w-8 h-8 text-luxury-gold" strokeWidth={1.5} />
  },
  {
    title: 'Elite Consulting',
    description: 'Bespoke advisory services tailored to high-net-worth individuals and institutional investors.',
    icon: <MapPin className="w-8 h-8 text-luxury-gold" strokeWidth={1.5} />
  }
];

export default function Home() {
  const featuredProperties = MOCK_PROPERTIES.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
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
            className="text-luxury-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium"
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
            <Link 
              to="/properties" 
              className="inline-flex items-center justify-center bg-luxury-gold text-white hover:bg-luxury-gold-hover px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] hover:-translate-y-1 rounded-sm"
            >
              View Properties
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Featured Listings</h2>
            <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {featuredProperties.map((item) => (
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
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/properties" 
              className="inline-flex items-center gap-2 border-b-2 border-luxury-gold text-slate-900 pb-1 font-bold tracking-widest uppercase text-sm hover:text-luxury-gold transition-colors"
            >
              View All Properties <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Expertise</h2>
            <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
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
                <div className="w-20 h-20 mx-auto border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-luxury-gold transition-colors duration-300">
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
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none pr-4 pb-4">
                <div className="absolute inset-0 bg-luxury-gold translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80" 
                  alt="About Hogar Homes" 
                  className="relative z-10 w-full h-[400px] md:h-[600px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <span className="text-luxury-gold uppercase tracking-widest text-sm font-bold mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8">Redefining Nigerian Luxury</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded on the principles of discretion, excellence, and unparalleled local expertise, Hogar Homes has emerged as the premier partner for high-net-worth individuals seeking the extraordinary.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We don't just sell properties; we curate lifestyles. From the shimmering waterfronts of Eko Atlantic to the exclusive enclaves of Banana Island, our portfolio represents the pinnacle of architectural achievement and investment potential.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-3xl font-serif text-slate-900 mb-1">₦4.5B+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Portfolio Value</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-slate-900 mb-1">150+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Elite Clients</p>
                </div>
              </div>
              <button className="border-b-2 border-luxury-gold text-slate-900 pb-1 font-bold tracking-widest uppercase text-sm hover:text-luxury-gold transition-colors">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl md:rounded-sm shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-slate-900 text-white">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Connect with an Expert</h2>
              <p className="text-gray-400 mb-10 leading-relaxed text-sm md:text-base">
                Whether you are seeking a primary residence, a seasonal retreat, or a strategic investment, our advisors are at your service.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold border border-luxury-gold/20">
                    <Phone size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">Inquiries</p>
                    <p className="text-base md:text-lg">+234 (0) 800 HOGAR</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold border border-luxury-gold/20">
                    <Mail size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">Email</p>
                    <p className="text-base md:text-lg">concierge@hogarhomes.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Full Name</label>
                    <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-luxury-gold transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Email Address</label>
                    <input type="email" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-luxury-gold transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Message</label>
                  <textarea rows={4} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-luxury-gold transition-colors resize-none text-sm"></textarea>
                </div>
                <button className="w-full bg-slate-900 text-white py-4 uppercase tracking-[0.2em] text-xs md:text-sm font-bold hover:bg-luxury-gold transition-all duration-300">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
