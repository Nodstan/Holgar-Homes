import React from 'react';
import { Award, ShieldCheck, MapPin, ArrowRight, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white pt-24 md:pt-32">
      {/* HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#C5A059]/10 rounded-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
              alt="Voke Irekpita" 
              className="relative rounded-xl w-full h-[500px] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-xl shadow-xl hidden md:block">
              <p className="text-[#C5A059] font-black text-2xl">100+</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Premium Closings</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-xs">The Expert</span>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
              Meet Voke <span className="italic">Irekpita</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Your trusted real estate expert specializing in Eko Atlantic's luxury property market. 
              With deep local knowledge and a commitment to excellence, I help clients find their 
              perfect home in Lagos's most prestigious development.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">Trusted by Nigeria's Elite</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Certified Professional", 
                desc: "Licensed real estate agent with a proven track record of excellence.",
                icon: Award 
              },
              { 
                title: "Client-Focused", 
                desc: "Personalized service tailored to your unique lifestyle and needs.",
                icon: ShieldCheck 
              },
              { 
                title: "Local Expert", 
                desc: "Extensive knowledge of Eko Atlantic and the broader Lagos market.",
                icon: MapPin 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C5A059] transition-colors">
                  <feature.icon className="text-[#C5A059] group-hover:text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
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