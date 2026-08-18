import React from 'react';
import { Sparkles, ShieldCheck, Microscope, Leaf, RefreshCw, Award } from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export const ScienceSection = () => {
  const pillars = [
    {
      icon: <Leaf className="text-brand-600" size={28} />,
      title: "100% Traceable Whole-Foods",
      description: "We source indigenous heirloom grains like Rajamudi Red Rice and bioactive whole botanical powders (Amla, Turmeric, Raw Seeds) from single-origin partner growers."
    },
    {
      icon: <Microscope className="text-brand-600" size={28} />,
      title: "Cellular Bio-Availability",
      description: "Nutrition is only as good as what your body absorbs. We use unpolished cold-ground whole seeds, sublingual nano-delivery strips, and fermented probiotics to achieve >95% cellular uptake."
    },
    {
      icon: <ShieldCheck className="text-brand-600" size={28} />,
      title: "Clean Label • Zero Junk",
      description: "No artificial binders, no chemical preservatives, no refined sugars, and zero heavy metal contamination. Certified under FSSAI Lic. 20126211000610."
    },
    {
      icon: <Award className="text-brand-600" size={28} />,
      title: "Doctor & Nutritionist Formulated",
      description: "Every formulation is designed by our global advisory board of integrative medical doctors, gastroenterologists, and herbal formulators for physiological synergy."
    }
  ];

  return (
    <section id="science-section" className="py-16 sm:py-20 bg-white border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-brand-50 border border-brand-200 text-brand-800 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles size={13} className="text-gold-500" />
            <span>The Science of Wellbeing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 tracking-tight">
            Future of Clean, High-Potency Nutrition
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2.5 leading-relaxed">
            We bridge ancient Ayurvedic wisdom and modern clinical nutrition. Pure, honest ingredients preserved in their most bioavailable states.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] p-6 rounded-2xl border border-warm-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-warm-200 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-900 transition">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-warm-200 flex items-center space-x-1 text-[11px] font-bold text-brand-800">
                <span>Verified Standard</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Traceability Spotlight Banner */}
        <div id="about-section" className="mt-12 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-gold-400 font-mono text-xs uppercase tracking-widest font-bold">
                Farm-to-Table Transparency
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                Honesty Inside Out: Full Batch Traceability
              </h3>
              <p className="text-xs sm:text-sm text-brand-100 leading-relaxed max-w-2xl">
                We take immense pride in our indigenous agricultural partnerships in Anantapur and Karnataka. From our heirloom Rajamudi paddy fields to our clean-room sachet blending lines, every single batch carries a verifiable certificate of analysis.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-brand-200">
                <span className="flex items-center space-x-1">
                  <span className="text-gold-400">✓</span>
                  <span>Registered FSSAI Lic: {brandInfo.fssaiNumber}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-gold-400">✓</span>
                  <span>Direct-to-Farmer Fair Trade</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-gold-400">✓</span>
                  <span>Eco-Friendly Recyclable Packaging</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2">
                <div className="text-4xl">🌾✨</div>
                <p className="text-sm font-bold text-white">Anantapur & Bengaluru Heritage</p>
                <p className="text-[11px] text-brand-200">Door No 12-3-514-18, Sai Nagar, Anantapur, AP</p>
                <a
                  href="#products-section"
                  className="inline-block mt-2 bg-gold-400 hover:bg-gold-500 text-brand-950 text-xs font-extrabold px-4 py-2 rounded-full transition shadow-sm"
                >
                  Explore Clean Harvest
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
