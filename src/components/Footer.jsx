import React, { useState } from 'react';
import { brandInfo } from '../data/brandInfo';
import { getAssetUrl } from '../utils/assetHelper';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Heart, 
  CheckCircle,
  Clock,
  Lock
} from 'lucide-react';

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-950 text-warm-200 pt-16 pb-12 border-t border-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Community Section */}
        <div className="bg-brand-900/60 rounded-3xl p-6 sm:p-10 border border-brand-800 backdrop-blur-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-gold-400 font-mono text-xs uppercase tracking-widest font-bold">
              Join the WellBeingByNatureCo Community
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Unlock 15% OFF Your First Wellness Order
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Receive verified botanical insights, seasonal harvest updates, and member-only rewards.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-emerald-900/60 border border-emerald-500/50 rounded-2xl text-emerald-200 flex items-center space-x-2.5 text-xs sm:text-sm font-bold">
                <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                <span>🎉 You are subscribed! Use code <strong>NATURE10</strong> at checkout for an instant discount.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-brand-950/80 border border-brand-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-hidden focus:border-gold-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#C5A059] hover:bg-[#B38A4A] text-brand-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-md shrink-0 uppercase tracking-wider"
                >
                  <span>Subscribe</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Navigation & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Col 1: Brand & Official Registration */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <img 
                src={getAssetUrl("/images/logo/logo.png")} 
                alt="WellBeingByNatureCo Logo" 
                className="h-11 w-auto object-contain rounded-lg shadow-xs" 
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-white">
                  WellBeing<span className="text-brand-400">ByNature</span>Co
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gold-400 font-mono -mt-0.5">
                  NURTURE • BALANCE • THRIVE
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Cultivating ancient heirloom grains, clean morning gut elixirs, and hormone-synchronizing seed nutrition for holistic modern wellbeing.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <p className="flex items-start space-x-2">
                <MapPin size={15} className="text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Manufacturing:</strong> {brandInfo.registeredAddress}</span>
              </p>
              <p className="flex items-start space-x-2">
                <MapPin size={15} className="text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Corporate Office:</strong> {brandInfo.corporateAddress}</span>
              </p>
              <p className="flex items-center space-x-2">
                <ShieldCheck size={15} className="text-gold-400 shrink-0" />
                <span><strong>FSSAI Lic. No:</strong> {brandInfo.fssaiNumber}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Shop & Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-gold-300 transition text-left">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Hormone Balance & Women\'s Health')} className="hover:text-gold-300 transition text-left">
                  Seed Cycling Packs (Phase 1 & 2)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Gut Health & Morning Shots')} className="hover:text-gold-300 transition text-left">
                  Morning Shots Gut Drink Mix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Traditional Grains & Superfoods')} className="hover:text-gold-300 transition text-left">
                  Rajamudi Red Rice (1 KG)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'Traditional Grains & Superfoods')} className="hover:text-gold-300 transition text-left">
                  Millet Mixed Powder (1 KG)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Brand */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold-300 transition text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-story')} className="hover:text-gold-300 transition text-left">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-gold-300 transition text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('owner')} className="hover:text-gold-300 transition text-left flex items-center space-x-1">
                  <Lock size={11} className="text-gold-400" />
                  <span>Owner Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              SUPPORT & POLICIES
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-gold-300 transition text-left">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('refund')} className="hover:text-gold-300 transition text-left">
                  Refund & Cancellation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-gold-300 transition text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-gold-300 transition text-left">
                  Terms & Conditions
                </button>
              </li>
            </ul>

            <div className="pt-2 text-xs text-gray-300 space-y-1">
              <p className="flex items-center space-x-2">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <a href={`mailto:${brandInfo.email}`} className="hover:text-gold-300 transition">
                  {brandInfo.email}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={14} className="text-gold-400 shrink-0" />
                <a href={`tel:${brandInfo.supportPhone}`} className="hover:text-gold-300 transition">
                  {brandInfo.supportPhone}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-brand-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} WellBeingByNatureCo. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-gold-400">
              <span>🌾</span>
              <span>100% Heirloom Certified</span>
            </span>
            <span>•</span>
            <span>Manufactured with Care in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
