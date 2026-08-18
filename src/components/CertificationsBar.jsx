import React from 'react';
import { ShieldCheck, Award, Leaf, Check, Sparkles } from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export const CertificationsBar = () => {
  const certs = [
    { title: "FSSAI Registered", subtitle: `Lic. ${brandInfo.fssaiNumber}`, icon: "🏛️" },
    { title: "100% Whole-Food", subtitle: "No Chemical Binders", icon: "🌱" },
    { title: "GMP Certified Facility", subtitle: "Pharma Grade Standard", icon: "🏭" },
    { title: "Zero Heavy Metals", subtitle: "Third-Party Tested", icon: "🔬" },
    { title: "Clean Label Project", subtitle: "Transparent Sourcing", icon: "✨" },
    { title: "Cruelty Free & Non-GMO", subtitle: "100% Ethical", icon: "🐰" }
  ];

  return (
    <section className="bg-brand-900 text-white py-10 border-y border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono font-bold tracking-widest text-gold-400 uppercase">
            Purity Standards & Quality Control
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
            Our Quality & Clean Label Guarantee
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {certs.map((c, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10 text-center hover:bg-white/10 transition flex flex-col items-center justify-center space-y-1.5"
            >
              <span className="text-2xl">{c.icon}</span>
              <p className="text-xs font-bold text-white leading-tight">{c.title}</p>
              <p className="text-[10px] text-brand-300 font-mono">{c.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
