import React from 'react';
import { motion } from 'motion/react'; 
import { Home, LineChart, PieChart, ArrowUpRight, CheckCircle, Globe } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: "Property Sales",
      desc: "Expert guidance through the entire buying and selling process. We leverage a vast network of HNWIs to ensure your property reaches the right eyes.",
      icon: Home,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      features: ["Global Marketing", "Private Viewings", "Contract Negotiation"]
    },
    {
      title: "Market Analysis",
      desc: "Detailed market insights and data-driven property valuations. We provide the 'Eko Atlantic Intelligence' you won't find on public listings.",
      icon: LineChart,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: ["Price Trending", "Yield Projections", "Comparative Data"]
    },
    {
      title: "Investment Consulting",
      desc: "Strategic advice for portfolio diversification. From off-plan opportunities to land acquisition in prime Lagos districts.",
      icon: PieChart,
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80",
      features: ["ROI Modeling", "Risk Assessment", "Off-Plan Access"]
    }
  ];

  return (
    <div className="bg-brand-gray pb-20 overflow-x-hidden">
      
      {/* --- SHADOW-MASK HERO WITH ANIMATION --- */}
      <section className="relative bg-white pt-20 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover origin-right"
            alt="Eko Atlantic Skyline"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white pt-16 md:pt-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-brand-gold"></div>
              <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                Our Expertise
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-serif leading-tight mb-8">
              Bespoke <br />
              <span className="italic text-brand-gold block mt-2">Solutions</span>
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-lg mb-12 font-light tracking-wide">
              Navigating the pinnacle of Nigerian real estate requires more than just access—it requires an architect of deals.
            </p>

            <div className="flex items-center gap-10 opacity-90">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-brand-gold" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Global Standards</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-brand-gold" />
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Local Mastery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

{/* --- SERVICES CONTENT  --- */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 relative z-20 -mt-16 md:-mt-24">
        <div className="space-y-32">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: idx === 0 ? 0.4 : 0.1 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl h-[350px] md:h-[550px] bg-white">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  {/* Subtle inner glow for the overlap area */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem] md:rounded-[3.5rem]"></div>
                </div>
              </div>
              
              {/* Text Column - Set to white if it overlaps the dark mask, or slate for the rest */}
              <div className={`w-full lg:w-1/2 space-y-8 ${idx === 0 ? 'lg:pt-12' : ''}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-brand-gold shadow-xl shadow-slate-200/50">
                  <service.icon size={32} />
                </div>
                
                <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
                  {service.title}
                </h2>
                
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  {service.desc}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-[0.2em] text-xs pt-4 border-b-2 border-brand-gold pb-2 hover:text-brand-gold transition-all group">
                  Inquire for Details 
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;