import React from 'react';
import { Sparkles, Sun, Sunset, Moon, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { products } from '../data/products';
import { getAssetUrl } from '../utils/assetHelper';

export const SensoryRitualSection = ({ onSelectProduct }) => {
  const rituals = [
    {
      time: "07:00 AM",
      phase: "Morning Awakening",
      icon: <Sun className="text-amber-500" size={24} />,
      title: "The Microbiome & Digestion Spark",
      productName: "Morning Shots™ Gut Drink",
      productId: "morning-shots-gut-drink",
      description: "Blend 1 sachet (5g) with 200ml lukewarm water. Whole Amla, pure Turmeric, and warming Ginger soothe the stomach lining, stimulate bile flow, and banish morning sluggishness.",
      sensoryNote: "Tasting notes: Earthy Golden Turmeric with a zesty citrus-ginger warmth.",
      image: getAssetUrl("/images/products/morning-shots-10sachets.jpg")
    },
    {
      time: "01:30 PM",
      phase: "Midday Sustenance",
      icon: <Sunset className="text-coral-500" size={24} />,
      title: "Heirloom Grain Energy",
      productName: "Rajamudi Red Rice (100% Heirloom)",
      productId: "rajamudi-red-rice",
      description: "Slow-simmer unpolished Rajamudi grains. Rich in anthocyanin pigments and slow-burning complex carbs, it prevents afternoon sugar crashes and provides sustained satiety.",
      sensoryNote: "Sensory notes: Royal nutty aroma, firm hearty grain texture with natural red bran.",
      image: getAssetUrl("/images/products/rajamudi-red-rice-front.jpg")
    },
    {
      time: "08:30 PM",
      phase: "Evening Harmony",
      icon: <Moon className="text-indigo-400" size={24} />,
      title: "Hormone Harmony Protocol",
      productName: "28-Day Seed Cycling Duo Kit",
      productId: "seed-cycling-duo-kit",
      description: "Take your synchronized Phase 1 (Flax + Pumpkin) or Phase 2 (Sesame + Sunflower) raw seed blend to modulate natural hormone rhythms and support peaceful rest.",
      sensoryNote: "Sensory notes: Crisp, fresh unroasted whole seed crunch packed with Zinc, Vitamin E & Omega-3.",
      image: getAssetUrl("/images/products/seed-cycling-artwork.jpg")
    }
  ];

  const handleProductClick = (productId) => {
    const target = products.find((p) => p.id === productId);
    if (target && onSelectProduct) {
      onSelectProduct(target);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FAF7F2] to-white border-y border-warm-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-950 text-gold-400 border border-gold-500/30 text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-md">
            <Sparkles size={13} className="text-gold-400" />
            <span>The Daily Botanical Ritual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-950 tracking-tight">
            Nourishment in Rhythm with Nature
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Wellness is not a chore — it is an art. How our heirloom grains and botanical elixirs harmonize throughout your circadian cycle.
          </p>
        </div>

        {/* 3-Step Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rituals.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-warm-300 shadow-luxe hover:shadow-luxe-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top gold accent hairline */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-400 via-brand-700 to-gold-400 opacity-60" />

              <div className="space-y-4">
                {/* Header Time & Phase */}
                <div className="flex items-center justify-between border-b border-warm-200 pb-3">
                  <div className="flex items-center space-x-2">
                    {r.icon}
                    <span className="font-mono text-xs font-bold text-gray-500 tracking-wider">{r.time}</span>
                  </div>
                  <span className="bg-brand-50 text-brand-900 border border-brand-200 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                    {r.phase}
                  </span>
                </div>

                {/* Ritual Title */}
                <h3 className="font-serif font-bold text-xl text-gray-950 group-hover:text-brand-900 transition">
                  {r.title}
                </h3>

                {/* Product Image Card */}
                <div 
                  className="w-full h-44 bg-[#FAF8F5] rounded-2xl border border-warm-200 p-3 flex items-center justify-center cursor-pointer overflow-hidden shadow-inner group-hover:border-gold-400/60 transition"
                  onClick={() => handleProductClick(r.productId)}
                >
                  <img
                    src={r.image}
                    alt={r.productName}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">
                  {r.description}
                </p>

                <div className="bg-warm-50 p-3 rounded-xl border border-warm-200 text-[11px] text-brand-950 italic">
                  {r.sensoryNote}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 mt-4 border-t border-warm-200">
                <button
                  onClick={() => handleProductClick(r.productId)}
                  className="w-full py-2.5 rounded-xl bg-warm-100 hover:bg-brand-900 text-brand-950 hover:text-gold-300 text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <span>Explore {r.productName}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
