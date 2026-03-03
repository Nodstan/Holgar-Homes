import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, MapPin, Award as AwardIcon, Users, Building2 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white pt-24 md:pt-32 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-[#C5A059]/10 rounded-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
              alt="Voke Irekpita" 
              className="relative rounded-xl w-full h-[500px] md:h-[650px] object-cover shadow-2xl"
            />
            
            {/* Stats Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-8 -right-8 bg-slate-900 text-white p-8 rounded-2xl shadow-2xl hidden md:block border border-white/10"
            >
              <p className="text-[#C5A059] font-black text-3xl mb-1">100+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Premium Closings</p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-xs">The Expert</span>
              <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight mt-4">
                Meet Voke <br />
                <span className="italic text-[#C5A059]">Irekpita</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl leading-relaxed font-light"
            >
              Your trusted real estate expert specializing in Eko Atlantic's luxury property market. 
              With deep local knowledge and a commitment to excellence, I help clients find their 
              perfect home in Lagos's most prestigious development.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 shadow-sm"></div>
                ))}
              </div>
              <div>
                <p className="text-sm text-slate-900 font-bold uppercase tracking-widest">Trusted by Nigeria's Elite</p>
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 bg-[#C5A059] rounded-full" />)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                title: "Certified Professional", 
                desc: "Licensed real estate agent with a proven track record of excellence in high-stakes negotiations.",
                icon: AwardIcon 
              },
              { 
                title: "Client-Focused", 
                desc: "Personalized service tailored to your unique lifestyle, ensuring absolute discretion and comfort.",
                icon: ShieldCheck 
              },
              { 
                title: "Local Expert", 
                desc: "Extensive knowledge of Eko Atlantic's infrastructure and the broader Lagos prime market.",
                icon: MapPin 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#C5A059] transition-colors duration-300">
                  <feature.icon className="text-[#C5A059] group-hover:text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;