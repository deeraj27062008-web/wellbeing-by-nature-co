import React from 'react';
import { 
  Leaf, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Sun, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { brandInfo } from '../data/brandInfo';

export function OurStoryPage({ onGoShop }) {
  const brandValues = [
    {
      title: "1. Natural",
      subtitle: "Pure Botanical Origins",
      desc: "We believe healing starts with ingredients untouched by artificial syntheses. Every formulation uses pure seeds, roots, fruits, and heirloom grains.",
      icon: "🌱"
    },
    {
      title: "2. Honest",
      subtitle: "Transparent Formulations",
      desc: "Zero proprietary blends that hide dosages. Every milligram of Amla, Turmeric, Ginger, Flax, and Ragi is clearly printed on our packaging.",
      icon: "📜"
    },
    {
      title: "3. Thoughtful",
      subtitle: "Designed for Daily Life",
      desc: "Wellness shouldn't feel like a chore. Our sachets, functional powders, and seed protocols fit effortlessly into morning tea, water, or breakfast.",
      icon: "✨"
    },
    {
      title: "4. Nourishing",
      subtitle: "Whole-Body Synergy",
      desc: "True vitality works at the intersection of gut digestion, hormone rhythm, and steady cellular metabolism.",
      icon: "☀️"
    },
    {
      title: "5. Responsible",
      subtitle: "Ethical Indian Sourcing",
      desc: "We partner directly with sustainable growers across Karnataka and Andhra Pradesh, preserving heirloom crops like Rajamudi Red Rice.",
      icon: "🌾"
    },
    {
      title: "6. Everyday",
      subtitle: "Consistent Micro-Habits",
      desc: "Long-term health is built through small, consistent daily choices. We empower you to nurture, balance, and thrive every single day.",
      icon: "🧘"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Editorial Title Block */}
        <div className="text-center space-y-4 border-b border-warm-300 pb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-gold-600">
            THE WELLBEINGBYNATURE CHRONICLES • VOL. 1
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-950 leading-tight">
            Our Story: A Return To Wholeness
          </h1>
          <p className="text-sm sm:text-base text-gray-600 italic font-serif max-w-xl mx-auto">
            "The earth provides enough to satisfy every human need, provided we listen to the wisdom of its natural rhythms."
          </p>
        </div>

        {/* Section 1: Our Beginning */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-gold-600 font-mono text-xs font-bold uppercase">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span>CHAPTER 01</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">Our Beginning</h2>
          <div className="prose text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 font-sans">
            <p>
              In a world flooded with hyper-processed supplements, chemical isolates, and loud marketing gimmicks, our founders asked a fundamental question: <em>Why did we abandon the wholesome, ancient Indian foods that nourished generations of our ancestors?</em>
            </p>
            <p>
              WellBeingByNatureCo was born out of a desire to rediscover purity. We began in Southern India by studying traditional heirloom agriculture—where grains like **Rajamudi Red Rice** were cultivated without pesticides, and where morning decoctions of pure **Amla, Turmeric, and Ginger** were everyday staples for glowing gut health.
            </p>
          </div>
        </section>

        {/* Section 2: Why Nature */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-gold-600 font-mono text-xs font-bold uppercase">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span>CHAPTER 02</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">Why Nature</h2>
          <div className="prose text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 font-sans">
            <p>
              Your body is a delicate, interconnected ecosystem. When you ingest artificial fillers, preservatives, and synthetics, your liver and digestive tract spend precious energy filtering them out.
            </p>
            <p>
              Nature operates differently. When you consume raw Pumpkin Seeds in Phase 1 of Seed Cycling, you aren't just getting zinc; you are receiving the bioavailable fatty acids, plant enzymes, and trace minerals that make zinc assimilate smoothly. That is the genius of whole botanical nutrition.
            </p>
          </div>
        </section>

        {/* Section 3: Our Ingredients */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-gold-600 font-mono text-xs font-bold uppercase">
            <span className="w-8 h-[1px] bg-gold-500"></span>
            <span>CHAPTER 03</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">Our Ingredients & Sourcing</h2>
          <div className="prose text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 font-sans">
            <p>
              We maintain direct, uncompromised relationships with regional farming collectives. Our **Rajamudi Red Rice** is unpolished, keeping its ruby-red bran layer rich in natural anthocyanins and fiber. Our **Seed Cycling Packs** are unroasted to prevent sensitive Omega-3 oils from oxidizing.
            </p>
            <p>
              Every ingredient is tested for microbial cleanliness and heavy metals before packaging in our certified hygienic facility in Bengaluru & Anantapur (FSSAI Lic. 20126211000610).
            </p>
          </div>
        </section>

        {/* Brand Values Grid */}
        <section className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-gold-600 tracking-wider">OUR GUIDING PRINCIPLES</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-950">The Six Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {brandValues.map((val, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-warm-200 shadow-sm space-y-2">
                <span className="text-3xl mb-2 block">{val.icon}</span>
                <h3 className="font-serif font-bold text-base text-brand-950">{val.title}</h3>
                <p className="text-[11px] font-mono text-gold-600 font-bold uppercase">{val.subtitle}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Our Promise & Future */}
        <section className="bg-brand-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gold-500/30 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-gold-400/20 text-gold-400 flex items-center justify-center mx-auto border border-gold-400/50">
            <Sparkles size={24} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-200">Our Promise To You</h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We promise never to compromise on quality, never to make misleading medical claims, and to continuously honor the botanical integrity of Indian nutrition.
          </p>
          <div>
            <button
              onClick={onGoShop}
              className="bg-gold-400 hover:bg-gold-300 text-brand-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-md inline-flex items-center space-x-2"
            >
              <span>Explore Our Natural Products</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
