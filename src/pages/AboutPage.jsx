import React from 'react';
import { Leaf, ShieldCheck, Heart, Sparkles, Award, Users, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export function AboutPage({ onGoShop }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-gold-600 bg-gold-100/70 px-3.5 py-1 rounded-full border border-gold-300">
            <Leaf size={13} className="text-brand-800" />
            <span>NURTURE • BALANCE • THRIVE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-950 leading-tight">
            Nutrition With Nature At Heart.
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
            WellBeingByNatureCo was founded on a simple conviction: modern daily wellness does not require synthetic isolates. It begins with whole, traceable botanical foods celebrated by ancient Indian wisdom.
          </p>
        </div>

        {/* Brand Philosophy Image & Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gold-400/40 aspect-21/9 bg-brand-950 flex items-center justify-center p-8 text-center text-white">
          <div className="max-w-2xl space-y-3 z-10">
            <div className="w-14 h-14 rounded-full bg-gold-400/20 border-2 border-gold-400/60 flex items-center justify-center mx-auto text-gold-300 font-serif font-bold text-2xl">
              WB
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-200">
              Ancient Goodness • Modern Wellness
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              We bridge the gap between time-tested heirloom superfoods and seamless daily routines for contemporary lifestyles.
            </p>
          </div>
        </div>

        {/* Sourcing & Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center">
              <Leaf size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-950">100% Traceable Whole Foods</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              From traditional heirloom Rajamudi Red Rice to unroasted nutrient-dense seeds, every ingredient is traceable to verified agricultural origins.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-950">Zero Artificial Additives</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We never use artificial colors, synthetic flavors, chemical preservatives, or hidden sweeteners. What you see on our label is pure nature.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center">
              <Award size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-950">Rigorous Lab Standards</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every production batch is tested for heavy metals, moisture control, microbial purity, and active botanical potency under FSSAI license 20126211000610.
            </p>
          </div>
        </div>

        {/* The 4 Flagship Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-warm-200 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-gold-600 tracking-wider">Our Formulations</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">Crafted For Everyday Well-Being</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-brand-800 bg-brand-100 px-2 py-0.5 rounded">Hormone Rhythm</span>
              <h4 className="font-serif font-bold text-base text-brand-950">28-Day Seed Cycling Protocols</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tailored seed rotations supporting follicular and luteal phases with essential fatty acids, zinc, and selenium.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-brand-800 bg-brand-100 px-2 py-0.5 rounded">Gut Synergy</span>
              <h4 className="font-serif font-bold text-base text-brand-950">Morning Botanical Shots</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Raw Amla, pure Turmeric, and Ginger to awaken internal digestive fire and calm morning bloating.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-brand-800 bg-brand-100 px-2 py-0.5 rounded">Heirloom Heritage</span>
              <h4 className="font-serif font-bold text-base text-brand-950">Unpolished Rajamudi Red Rice</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Historic royal red grain packed with natural anthocyanin antioxidants and low-glycemic satiety.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-brand-800 bg-brand-100 px-2 py-0.5 rounded">Ancient Supergrains</span>
              <h4 className="font-serif font-bold text-base text-brand-950">Millet Mixed Powder</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Sprouted Ragi, Jowar, Chickpea, and Foxtail Millet delivering plant calcium and clean protein.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onGoShop}
              className="bg-brand-950 hover:bg-brand-900 text-gold-300 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md inline-flex items-center space-x-2 border border-gold-500/30"
            >
              <span>Explore The Catalog</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
