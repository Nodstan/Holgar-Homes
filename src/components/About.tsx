import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimized Image URLs
  const highRes = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format,compress&q=80&w=1000";
  const placeholder = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format,compress&q=10&w=20";

  return (
    // Updated background to Cool Gray (#F0F0F0) from guidelines
    <div className="bg-[#F0F0F0] pt-24 md:pt-32 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side with Instant-Load Logic */}
          <div className="relative group h-[500px] md:h-[650px] rounded-xl overflow-hidden">
            <img 
              src={placeholder} 
              alt="Loading..." 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
              style={{ filter: 'blur(20px)' }}
            />
            <img 
              src={highRes} 
              alt="Voke Irekpita" 
              onLoad={() => setIsLoaded(true)}
              className={`relative w-full h-full object-cover shadow-2xl transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
              fetchpriority="high"
            />
            {/* Brand Gold Accent Frame */}
            <div className="absolute -inset-4 border-[12px] border-[#D4AF37]/10 rounded-2xl pointer-events-none transition-transform duration-500 group-hover:scale-95" />
            
            {/* Stats Badge - Brand Navy (#1B1F3B) */}
            <div className="absolute bottom-8 -right-4 bg-[#1B1F3B] text-white p-8 rounded-2xl shadow-2xl hidden md:block border border-white/10">
              <p className="text-[#D4AF37] font-black text-3xl mb-1">100+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Premium Closings</p>
            </div>
          </div>

          {/* Text Side - Typography Alignment */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Using Gold (#D4AF37) for sub-headers */}
              <span className="text-[#D4AF37] font-bold uppercase tracking-[0.4em] text-xs">The Expert</span>
              {/* Primary Headings: Brand Navy (#1B1F3B) + CS Glodive style (Sans-Serif) */}
              <h1 className="text-5xl md:text-7xl font-sans font-light text-[#1B1F3B] tracking-tight leading-tight mt-4">
                Meet Voke <br />
                <span className="italic font-serif text-[#D4AF37]">Irekpita</span>
              </h1>
            </motion.div>

            {/* Body Text: Poppins style readability */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed font-normal max-w-xl"
            >
              Lead Consultant at Hogar Homes, Voke specializes in Eko Atlantic's most prestigious 
              developments. With a commitment to excellence and deep local expertise, 
              she ensures a seamless experience for Nigeria's elite clientele.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                title: "Certified Professional", 
                icon: Award, 
                desc: "Licensed investment consultants providing exceptional expertise in the Lagos market." 
              },
              { 
                title: "Client-Focused", 
                icon: ShieldCheck, 
                desc: "Building long-lasting relationships through a commitment to absolute excellence." 
              },
              { 
                title: "Local Expert", 
                icon: MapPin, 
                desc: "Extensive knowledge of Eko Atlantic City and premium property management." 
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-[#F0F0F0]/50 p-12 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon Box: Brand Navy with Gold Icon */}
                <div className="w-16 h-16 bg-[#1B1F3B] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] transition-colors duration-300">
                  <feature.icon className="text-[#D4AF37] group-hover:text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#1B1F3B] mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;