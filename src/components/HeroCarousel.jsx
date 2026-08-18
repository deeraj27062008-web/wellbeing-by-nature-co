import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Leaf, 
  Microscope 
} from 'lucide-react';

export function HeroCarousel({ onOpenQuiz, onSelectProduct, onOpenBatchVerifier, onGoShop }) {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: "slide-hero-main",
      tag: "PURE BOTANICAL WELLNESS",
      pill: "NURTURE • BALANCE • THRIVE",
      headline: "NOURISH YOUR BODY. THRIVE EVERY DAY.",
      subheadline: "Nature-powered nutrition thoughtfully crafted for everyday wellbeing.",
      description: "Discover authentic Indian heirloom supergrains, 28-day seed cycling hormone protocols, and morning gut detox elixirs—100% natural and free of artificial additives.",
      productId: "seed-cycling-duo-kit",
      bgGradient: "from-[#142318] via-[#1F3325] to-[#122216]",
      accentBadge: "Doctor Formulated • FSSAI 20126211000610",
      ctaText: "SHOP NOW",
      secondaryText: "EXPLORE WELLNESS",
      image: "/images/products/seed-cycling-artwork.jpg"
    },
    {
      id: "slide-morning-shots",
      tag: "HAUTE BOTANICAL ELIXIR",
      pill: "TURMERIC • AMLA • GINGER",
      headline: "MORNING SHOTS | GUT FRIENDLY DRINK MIX",
      subheadline: "Nourish Your Gut. Elevate Your Life.",
      description: "A potent morning blend of sun-dried Amla, golden Turmeric, and warming Ginger to soothe digestive heaviness, reduce bloating, and fuel radiant daily vitality.",
      productId: "morning-shots-gut-drink",
      bgGradient: "from-[#182312] via-[#2A381F] to-[#182414]",
      accentBadge: "Daily Gut Detox • 10 Sachets / 200g",
      ctaText: "SHOP MORNING SHOTS (₹349)",
      secondaryText: "EXPLORE WELLNESS",
      image: "/images/products/morning-shots-10sachets.jpg"
    },
    {
      id: "slide-rajamudi",
      tag: "ROYAL HEIRLOOM RESERVE",
      pill: "100% TRADITIONAL HEIRLOOM RICE",
      headline: "RAJAMUDI RED RICE (1 KG)",
      subheadline: "Ancient Grain • Naturally Nutritious • Wholesome Everyday Rice",
      description: "Historically savored by royalty, our unpolished Rajamudi rice preserves its ruby-red bran layer, delivering rich dietary fiber, anthocyanin antioxidants, and a gentle low-glycemic profile.",
      productId: "rajamudi-red-rice",
      bgGradient: "from-[#2A160E] via-[#3F2217] to-[#1C0F0A]",
      accentBadge: "Low Glycemic Index • Rich in Fibre",
      ctaText: "SHOP RAJAMUDI RICE (₹499)",
      secondaryText: "EXPLORE WELLNESS",
      image: "/images/products/rajamudi-red-rice-front.jpg"
    },
    {
      id: "slide-millet",
      tag: "WHOLE SUPERGRAIN BLEND",
      pill: "RAGI • JOWAR • CHICKPEA • FOXTAIL",
      headline: "MILLET MIXED POWDER (1 KG)",
      subheadline: "Nourishing Blend. Naturally.",
      description: "Artisanal blend of calcium-rich Ragi, protein-packed Chickpea, and low-GI Sorghum and Foxtail Millet for wholesome breakfast porridge, rotis, and sustained daily stamina.",
      productId: "millet-mixed-powder",
      bgGradient: "from-[#232014] via-[#383320] to-[#1A180E]",
      accentBadge: "Rich in Calcium & Plant Protein",
      ctaText: "SHOP MILLET BLEND (₹449)",
      secondaryText: "EXPLORE WELLNESS",
      image: "/images/products/millet-mixed-powder.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const current = heroSlides[currentSlide];

  const handleCtaClick = () => {
    const targetProduct = products.find((p) => p.id === current.productId || p.slug === current.productId);
    if (targetProduct && onSelectProduct) {
      onSelectProduct(targetProduct);
    } else if (onGoShop) {
      onGoShop();
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white min-h-[580px] sm:min-h-[620px] flex items-center border-b border-gold-500/20">
      {/* Background with dynamic subtle gradients */}
      <div className={`absolute inset-0 bg-gradient-to-r ${current.bgGradient} transition-all duration-1000 opacity-95`} />
      
      {/* Subtle gold dust background grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 animate-in fade-in slide-in-from-left-4 duration-500 key={current.id}">
            
            {/* Badges & Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gold-500/20 text-gold-300 border border-gold-400/50 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full tracking-widest flex items-center space-x-1 shadow-sm">
                <Sparkles size={11} className="mr-1 inline text-gold-400" />
                {current.tag}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-gray-200 text-[10px] font-mono font-semibold uppercase px-3 py-1 rounded-full tracking-wider border border-white/10">
                {current.pill}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {current.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gold-200 font-serif italic leading-snug">
              {current.subheadline}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              {current.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={handleCtaClick}
                className="bg-[#C5A059] hover:bg-[#B38A4A] text-brand-950 text-xs sm:text-sm font-extrabold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center space-x-2 group uppercase tracking-wider"
              >
                <span>{current.ctaText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onGoShop}
                className="bg-white/10 hover:bg-white/20 text-gold-300 border border-gold-500/40 text-xs font-semibold px-6 py-4 rounded-full transition-all flex items-center space-x-2 uppercase tracking-wider font-mono"
              >
                <span>{current.secondaryText}</span>
              </button>
            </div>
          </div>

          {/* Right Product Image Stage */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer" onClick={handleCtaClick}>
              {/* Luxury Glow */}
              <div className="absolute -inset-4 bg-gold-500/20 rounded-3xl blur-2xl group-hover:bg-gold-400/30 transition-all duration-500" />

              {/* Card Container */}
              <div className="relative bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-gold-400/40 shadow-2xl overflow-hidden max-w-sm sm:max-w-md">
                
                {/* Accent Badge */}
                <div className="absolute top-6 left-6 z-10 bg-brand-950/95 text-gold-300 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-md border border-gold-500/40 flex items-center space-x-1">
                  <Award size={12} className="text-gold-400 mr-1" />
                  <span>{current.accentBadge}</span>
                </div>

                <div className="w-64 h-72 sm:w-72 sm:h-80 mx-auto rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center p-3 border border-warm-200">
                  <img
                    src={current.image}
                    alt={current.headline}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[10px] font-mono font-bold text-gold-300 uppercase tracking-widest">
                    100% Authentic Packaging Artwork
                  </p>
                  <p className="text-[11px] text-gray-300 font-serif italic mt-0.5">
                    Click to view full nutritional specs & details
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-gold-400 backdrop-blur-xs flex items-center justify-center transition border border-gold-400/30 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-gold-400 backdrop-blur-xs flex items-center justify-center transition border border-gold-400/30 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-gold-400' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
