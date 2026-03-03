import React from 'react';
import { Home, LineChart, PieChart, ArrowUpRight } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: "Property Sales",
      desc: "Expert guidance through the entire buying and selling process, ensuring maximum value and seamless transitions.",
      icon: Home,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
    },
    {
      title: "Market Analysis",
      desc: "Detailed market insights and data-driven property valuations to help you make informed real estate decisions.",
      icon: LineChart,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
    },
    {
      title: "Investment Consulting",
      desc: "Strategic advice for real estate investment opportunities in Eko Atlantic and prime Lagos locations.",
      icon: PieChart,
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-white pt-24 md:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <span className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-xs">Excellence in Service</span>
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mt-4 mb-6">
            Comprehensive Real Estate <span className="italic text-slate-400">Solutions</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Navigating the luxury market requires more than just access—it requires insight. 
            Voke Irekpita provides a seamless journey from discovery to acquisition.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-[3rem] h-[400px]">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/20"></div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-5xl font-serif text-[#C5A059]/20">0{idx + 1}</span>
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-4">
                  <service.icon className="text-[#C5A059]" size={32} />
                  {service.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {service.desc}
                </p>
                <button className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs border-b-2 border-[#C5A059] pb-2 hover:text-[#C5A059] transition-colors">
                  Learn More <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;