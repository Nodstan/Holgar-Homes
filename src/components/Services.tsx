import React from 'react';
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
    <div className="bg-white pb-20 overflow-x-hidden">
      
      {/* --- FLASHY HERO SECTION --- */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover scale-105"
            alt="Luxury Real Estate"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
          <div className="max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#C5A059]"></div>
              <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                Our Expertise
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-serif leading-tight mb-8">
              Bespoke Real Estate <br />
              <span className="italic text-[#C5A059]">Solutions</span>
            </h1>
            
            <p className="text-slate-200 text-sm md:text-lg leading-relaxed max-w-xl mb-10">
              Navigating the pinnacle of Nigerian real estate requires more than just access—it requires an architect of deals. 
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Local Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES CONTENT --- */}
      <section className="max-w-[1440px] mx-auto px-6 -mt-20 relative z-20">
        <div className="space-y-16 md:space-y-32">
          {services.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
              
              {/* Image Column */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl h-[350px] md:h-[550px]">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                </div>
              </div>
              
              {/* Text Column */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 text-[#C5A059] shadow-inner">
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
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-[0.2em] text-xs pt-4 border-b-2 border-[#C5A059] pb-2 hover:text-[#C5A059] transition-all group">
                  Inquire for Details 
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="max-w-[1440px] mx-auto px-6 mt-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-5 blur-[100px]"></div>
           <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Ready to secure your piece <br /> of <span className="text-[#C5A059]">Eko Atlantic?</span></h2>
           <button className="bg-[#C5A059] text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all active:scale-95">
             Start Your Journey
           </button>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;